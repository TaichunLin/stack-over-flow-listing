# kickstart

[Leah- stack-over-flow-listing](https://taichunlin.github.io/stack-over-flow-listing/)


## Using the HTML, CSS, React.js/Vue.js to create a simplified listing of StackOverflow tags
and questions. 

redesign the StackOverflow listing with [the StackExchange API](https://api.stackexchange.com/docs)and show loading spinner when fetching data

## Trending Tags

1. Display top 10 trending tags
2. Data can be found using [the StackExchange tags API](https://api.stackexchange.com/docs/tags)
3. Default selected the first tag
4. Use a round corner for tag border

## Question Listing

1. The question list data can be found using [the StackExchange questions API](https://api.stackexchange.com/docs/questions) with the selected tag as the filter
2. Support infinite scrolling (20 questions per fetch) and lazy load.
3. When scrolling down the list, the “Trending Tags” section shall scroll together.
4. Clicking a question will open a new tab to the question link.
5. Highlight the score when it is below zero
6. Highlight the answers with border only when it has more than 1 answer but not accepted.
7. Highlight the answers when it has more than 1 answer and accepted.
8. Apply round corner for user profile picture.

## Searching

1. The search will apply searching to trending tags.
2. The search bar is located at the top of the page, even when the list is scrolling.
3. Search is performed when the keyword is typed, trending tags and listing shall update
accordingly.


After you clone the repository, you can run:
### `npm start`


##`React`
##`Redux Toolkit`
##`BEM`
##`SASS`
##`custom hooks`
