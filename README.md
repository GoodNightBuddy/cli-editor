# Browser text&code editor controled by command line
Deployed online editor you can see on [_this_](https://github.com/GoodNightBuddy/editor) page.
If you want to test it on your local machine from terminal follow instruction below.

## Featuress
- Code editor similar to VSCode
- Text editor
- Import another libraries(such as React)
- Code from previous cells is able for next cells. But not the contrary. For each cell it's own code compiles with code of previous cells. But not with code of next cells
- Function print(el) - print strings, number, arrays, jsx ant etc.
- Save users code/text into .json file. It automatically saved after users changes. Online editor doesnt't have this feature.

## Install

- Use npx @my-custom-cli/cli <command>

## Usage
App starts with one command: $serve. You can change default port or file only before running app.
Serve command for default starts app on http://localhost:4005/. Open this port in browser and start write some code&text.
App creates a file notebook.js in folder where terminal was started. But you can change default port, filename, filepath or if you already have such file - you can specify path to it.

In cli:
- $serve - starts app on default port with default .js file
- $serve -p 3005, --port=3005 - starts app on specified port
- $serve /myfolder/mybook.js starts app with specifeid file. If file exist it try to read it. If no - app creat such file.
- $serve -h, --help - display help for command

In browser:
- Function print(el) - print strings, number, arrays, jsx ant etc. Use it to print neede information to right field

For example:
$serve --port=3005 /myfolder/mybook.js
It will open app on http://localhost:3005/ and read  mybook.js in folder /myfolder which relative to folder opened in terminal. If file doesn't exist such file will be created.

You can use:
$ npx @my-custom-cli/cli serve D:\Mybook\ -p 8080
It will creat  default file notebook.js in specified folder and run app on http://localhost:8080/. 


### Screenshot
[Screenshot](./image.png)