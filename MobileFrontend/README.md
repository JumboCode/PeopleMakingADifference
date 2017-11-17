# PMD Mobile Ionic App
Placeholder ReadMe

# To run
```
~/PeopleMakingADifference/mobile/pmd_mobile$ ionic serve
```
# Linting

To enforce code style, we're using the [Google TypeScript style](https://github.com/google/ts-style). 

In order to run the linter, install the "gts" binary:

```
$ (sudo) npm install -g gts
```

Then, to lint the whole project at once, make sure you're in the ~/PeopleMakingADifference/MobileFrontend directory first (you need to be there so that the linter can find our tslint.config file) and run: 

```
~/PeopleMakingADifference/MobileFrontend$ gts check

```

Or 

```
$ npm run check
```

This should print all of the violations to your terminal window.

Then, you can either hand-fix each error, or let GTS try to fix the errors for you. To try to fix all errors at once, do:
```
$ gts fix
```
Be sure to review the changes to make sure everything still works as expected. If it does, and running
```
$ gts check
```
doesn't print out any more errors, you're good! Commit and push those changes. 

If you don't want to lint the whole project at once, but just a file you're working on, use:
```
$ gts check path/to/file.ts
$ gts fix path/to/file.ts
```