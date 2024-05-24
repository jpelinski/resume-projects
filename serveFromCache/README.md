## Serve Data From Cache

This application is an implementation of fetching data from google book API, saving data to cache files and reading cahced data if specific conditions are met.

Before start please run:

`npm install`

to install "fs" and "axios".

To start, run `node App.js`. 
Then type keyword you are looking for. For example "terraform", after that you will recive list of books from API with this keyword.

> Explanation

After writing your keyword, app will check if cache file already exists.
	(TRUE) If it exists, it will check if was created  more than 10 seconds ago.
 		(TRUE) More than 10 seconds:  it will make  API call.
		(FALSE) Less than 10 seconds: it will serve data from cache file
	(FALSE) If file does not exists, it will make API call, and save JSON data to cache file.

