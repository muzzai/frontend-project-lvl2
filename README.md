<a href="https://codeclimate.com/github/muzzai/frontend-project-lvl2/maintainability"><img src="https://api.codeclimate.com/v1/badges/48ab6414e848ffe6dd2a/maintainability" /></a>
<a href="https://codeclimate.com/github/muzzai/frontend-project-lvl2/test_coverage"><img src="https://api.codeclimate.com/v1/badges/48ab6414e848ffe6dd2a/test_coverage" /></a>
![Node CI](https://github.com/muzzai/frontend-project-lvl2/workflows/Node%20CI/badge.svg)
# Command Line Interface project
Compares two configuration files and shows the difference. Available for \*.json, \*.yml and \*.ini files.
The difference can be displayed as a __tree__, __json__ or in __plain__ format.
## Install
Clone repo
```
$ git clone https://github.com/muzzai/frontend-project-lvl2.git
```
Navigate to the package root folder install dependencies with
```
$ make install
```
then publish the package locally with
```
$ make publish
```
and install it to your system globally with
```
$ sudo npm link
```
## Usage
```
Usage: gendiff [options] <firstConfig> <secondConfig>

Compares two configuration files and shows a difference.

Options:
  -V, --version        output the version number
  -f, --format [type]  output format (default: "tree")
  -h, --help           output usage information
  ```
## Examples
<br><a href="https://asciinema.org/a/5u85AuECVJ8G6G3y9J9mRWKlG" target="_blank"><img src="https://asciinema.org/a/5u85AuECVJ8G6G3y9J9mRWKlG.svg" /></a>
<br><a href="https://asciinema.org/a/RIWpZW4cw8syuhXCNA3ORwAho" target="_blank"><img src="https://asciinema.org/a/RIWpZW4cw8syuhXCNA3ORwAho.svg" /></a>
<br> <a href="https://asciinema.org/a/czmA4kWzBXHZXDZyTunHLLsKj" target="_blank"><img src="https://asciinema.org/a/czmA4kWzBXHZXDZyTunHLLsKj.svg" /></a>