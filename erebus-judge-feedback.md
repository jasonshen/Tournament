# Erebus Judge Feedback

## Summary
"This candidate has a keen eye for UX (or at least, the kind of user experiences I enjoy) that makes the final product feel really snappy and fun."

"There are some concerns about edge cases and code layout that keep this from being super strong in all areas, but I think it's important to note that the final product is nice enough that it more than makes up for these areas.  The complaints I would have in a code review are easily addressable."

## Functionality
_Does this meet the core requirements? Does the submission have functionality beyond the core requirements? How complex are these additional functionalities?_

"I'm discounting the gallery component because I think that was an unreasonable ask, but otherwise this candidate met all expectations and requirements. There's nothing above and beyond what was asked, but they solidly completed all the requirements."

"Lacks state persistence of previous uploaded images/villains"

## Presentation
_Are contemporary standards for presentation used? For example, have different screen sizes been considered?
"I can't quite put my finger on it, because the submission is so simple, but there's something extremely elegant and pleasing about this submission.

The UI is very minimalist, smooth, responsive, and is 100% ready for mobile. 

I think this will be contentious because of how minimal the UI is, but there's nothing that feels clunky about using this to me, and it reminds me of many simple production websites I've seen: "downforeveryoneorme" type-websites, but given the time constraints I think that's appropriate here."

"- Nice  UX with modal when reporting a match
- The "No" button is a nice touch for resetting state"

## Thoroughness
_Have edge cases been considered? For example, what happens if the API returns an error?_

Unfortunately the candidate falls a bit short in thoroughness. API errors aren't handled: It just asks you if a blank picture is the villain (with no error state). You can definitely upload things that aren't images, and similar a "No Match" isn't handled properly.

- Lack of file type validation
- Does not handle basic errors like XHR failures in the UI

## Extensibility
_How easy is it to add new functionality? How easy is it to adjust existing functionality?_
"I think the level of separation here is about right, although the main App.js has a lot of logic in it that should probably be split into other files. Ultimately I would consider that refactor to be a fairly minor one, and wouldn't be a show-stopper on a pull request."

"My litmus test for extensibility is: If I had to add an error state for API errors, how hard would that be? In this case it seems fairly straight-forward, I'd add it to the promise chain in the `imagePost` and `reportVillain` functions.

Given all that, I'd again rate this at a little below 3 stars but not 2 stars."

"- Inconsistent mix of inline styling and dedicated CSS files
- Nice modularity with the way components are broken down
- Wonky implementation of the click handler in the Villain card where one handler handles two different actions based on a piece of state in the DOM (element ID)"
