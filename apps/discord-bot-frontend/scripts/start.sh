# SQLite uses a file URL, remove "file:" prefix from DATABASE_URL
DATABASE_FILE_PATH=${DATABASE_URL#*file:}
cd prisma
pnpm prisma migrate deploy
if [ $? -eq 1 ]; then
  echo "Migration failed, attempting to resolve"
  pnpm prisma migrate resolve
fi
echo "Finish existing database prep"
cd -

prisma generate 

pnpm run start-server