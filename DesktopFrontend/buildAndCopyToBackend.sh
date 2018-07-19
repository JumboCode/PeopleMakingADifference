echo Building desktop front end and copying it into correct backend directory
ng build
rm -rf ../Backend/static
mkdir ../Backend/static
cp -r dist/* ../Backend/static/
