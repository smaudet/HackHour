HackHour
========

A repository for the Hack Hour

https://github.com/argodev/codemash-speakers/tree/master/api

Google Groups discussion:

https://groups.google.com/forum/#!topic/codemash/ilc0-wSJagg

* Speakers TODO needs update
* Session TODO needs update

Getting Started
===============

* Install Chocolatey (https://chocolatey.org/)
* `choco install nodejs`
* Make sure npm is in your path with `where npm`
* `npm install -g jade`
* Ensure jade is in your path with `where jade`
* 
Common APIs
===========

* http://api.jquery.com/
* https://github.com/mbostock/d3/wiki
* http://requirejs.org/docs/api.html

Architecture Overview
=====================

![Arch Image](https://raw.githubusercontent.com/smaudet/HackHour/CodemashAPI/images/HackHourCodeMash.png)

Resource Assignment
===================

* Gravatar - Tyler R.
* LinkedIn - ?
* Github - ?
* Twitter - Tyler K.
* AJAX library replacement for jQuery - Tim
* Core - Sebastian

Example API Request
===================

```
0:  {
Id: "a02a0671-98a9-4365-a7b5-b963c6b4b046"
FirstName: "Joseph"
LastName: "Andaverde"
Biography: "Joe is a full stack software developer from Kansas City. He has professional experience training hundreds of software developers about how to take advantage of Node.js through his organization called NodeLabs. He is continuously seeking to learn and find ways to share his experiences."
GravatarUrl: "//www.gravatar.com/avatar/20bcd9c84412ff9a04188982293ca539"
TwitterLink: null
GitHubLink: null
LinkedInProfile: null
BlogUrl: null
}
```

From the Codemash Speaker repository:
#speakersdata

Available Methods:

* [`GET api/speakersdata`](#get-apispeakersdata)
* [`GET api/speakersdata/{id}`](#get-apispeakersdataid)

Examples:
* Simple html example: [../examples/speakers.html](../examples/speakers.html)

##GET api/speakersdata

###Request Information
__URI Parameters__
* None

__Body Parameters__
* None

###Response Information
####Resource Description
Collection of `PublicSpeakerDataModel`

| Name        | Description                                  | Type   |
|-------------|----------------------------------------------|--------|
| Id          | Unique ID for this speaker                   | string |
| FirstName   | Speaker's first name                         | string | 
| LastName    | Speaker's last name                          | string |
| Biography   | Speaker-provided biography. May be long      | string |
| GravatarUrl | URL to speaker image based on provided email | string |
| TwitterLink | Link to speaker's twitter profile            | string |
| GitHubLink  | Link to speaker's Github home page           | string |
| LinkedInProfile | Link to speaker's LinkedIn Profile       | string |
| BlogUrl     | Link to speaker's blog/homepage              | string |
