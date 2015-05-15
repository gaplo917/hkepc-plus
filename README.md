# HKEPC Plus (Non-Official) Chrome plugin
Created By [LoGap](http://blog.gaplotech.com)

###Objective
To provide better user experience for hkepc forum user

### Theme & Font & Addons structure Overview
The core parts of this chrome extension will read the followings JSON 
```
/content/theme/theme.json
/content/font/font.json
/content/addons/addons.json

```

and dynamic reflect all the settings in JSON on Chrome option page.

### Getting start
##### Install the Extension
1. Chrome -> setting -> More Tools -> Extension

2. Tick Developer mode on top-right hand side

3. Download Zip from github

4. Unzip it

5. Click "Load unpacked extension" select the folder

6. You will see HKECP Plus will load and then click "Options" to enter the control panel


##### Make your first theme


--1. Make a new folder(e.g MyFirstTheme) in /content/theme/ 

--2. Create your CSS/Javascript injections in your folder
e.g create a javacript file /content/theme/MyFirstTheme/testInject.js

```
$(function(){
    alert("This javascript file is running");
});
```

--3. Edit /content/theme/theme.json
add your theme details in the json

```
{
  ...
  "MyFirstTheme":{
      "name":"My first theme for HKEPC",
      "css":[],
      "js":["testInject.js"],
	    "addons":[]
  }
}
```
--4. Refresh your chrome HKEPC Plus option page, you should able to see your new theme.

--5. Refresh your HKEPC web page in chrome! You should able to see a alert dialog.

##### Add addons to your theme
```
{
  ...
  "MyFirstTheme":{
      "name":"My first theme for HKEPC",
      "css":[],
      "js":["testInject.js"],
	    "addons":["THE_ADDONS_FOLDER_NAME"]
  }
}
```

##### Load External Plugin 
Use absolute path to indicate the plugin location
```
{
  ...
  "MyFirstTheme":{
      "name":"My first theme for HKEPC",
      "css":["/plugins/bootstrap/css/bootstrap.min.css"],
      "js":["testInject.js"],
	    "addons":["THE_ADDONS_FOLDER_NAME"]
  }
}
```

#####Make your font
All steps are very similar to "Make your first theme"

#####Make your addons
All steps are very similar to "Make your first theme"

###Screenshot Preview
[HKEPC Plus Preview - 1](http://blog.gaplotech.com/hkepc-chrome-plugin-preview/)

[HKEPC Plus Preview - 2](http://blog.gaplotech.com/hkepc-chrome-plugin-preview-2/)


###Road map
1. Create a HKEPC Plus Center for sharing and upload your own theme
2. Notification on HKECP notification & private message
3. Desktop App for surfing HKEPC
---Real time chating with HKECP desktop App user


#License
[The MIT License (MIT)](http://choosealicense.com/licenses/mit/)

Copyright (c) [2015] [LO YUE HEI]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
