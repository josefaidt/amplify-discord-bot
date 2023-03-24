import { getMonday } from './get-monday'
import type { TimePeriod, Question } from '../types'

export type GroupByDateOptions = {
  /**
   * @default 'week'
   */
  period?: TimePeriod
}

/**
 * Group questions by date, by day, week, month, or year
 */
export function groupQuestionsByDate(
  questions: Question[],
  options?: GroupByDateOptions
) {
  const grouped = questions.reduce<Record<string, Question[]>>(
    (acc, question) => {
      const date = new Date(question.createdAt)
      switch (options?.period ?? 'week') {
        case 'day': {
          const day = date.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          })
          if (acc[day]) {
            acc[day].push(question)
          } else {
            acc[day] = [question]
          }
          break
        }
        case 'week': {
          const monday = getMonday(date)
          const weekOf = monday.toLocaleDateString('en-US', {
            month: 'numeric',
            day: 'numeric',
            year: 'numeric',
          })
          if (acc[weekOf]) {
            acc[weekOf].push(question)
          } else {
            acc[weekOf] = [question]
          }
          break
        }
        case 'month': {
          const month = date.toLocaleDateString('en-US', {
            month: 'long',
            year: 'numeric',
          })
          if (acc[month]) {
            acc[month].push(question)
          } else {
            acc[month] = [question]
          }
          break
        }
        case 'year': {
          const year = date.getFullYear()
          if (acc[year]) {
            acc[year].push(question)
          } else {
            acc[year] = [question]
          }
          break
        }
      }
      return acc
    },
    {}
  )

  return grouped
}
