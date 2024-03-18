Text Slinger
Text saving browser extension.

## Idea

### Short description:

Saving frequently used text fragments for future reuse.

### Description:

While browsing internet often needed to input same text over and over. Like search clauses, inputs, form fills, comments and messages. Sometimes solved by resorting to create text files with reused text, this could be inconvenient.
This extension is aim to solve this problem by providing user friendly system for managing reusable texts directly in browser.

## Functionality

### Description:

Ability to save chunk of text (Text).
Ability to name (Title) this chunk of text for better visual representation.
Ability to see all of saved Texts presented by list of corresponding Titles.
Ability to find needed Text by using search functionality (Search).
Ability find by part of Title or Text
Ability to manage list of Texts categories (Category) and assigning Texts to Categories.
Ability to modify Tile of Texts, Text content and assigned Category. Also to delete Text and create new.
Ability to create Text from selection on page.
Ability to modify Category, also deleting and creating new Category.


## Architecture

#### Architecture overview

Architecture of app broadly goes like this

- UI layer
- Composables (Application Layer, ui logic, calls store)
- Store (Domain Model Layer, business logic, calls services)
- Services (Infrastructure Layer)

## Tech

vue3
typescript
pinia
quasar framework

### TODO

[V] Change text category

[V] Add new texts and categories

[V] Search

[V] option and popup pages

[V] extension store state persistance

[V] Copy to clipboard

[V] fix new text category select error

[V] Wrap with spaces toggle on option page

[ ] UX/UI improvements
[V] - Notifications
[V] - Expandable
[V] - Code cleanup (layout / views / debugs )
[V] - Dialogs
[V] - Texts and icons
[V] - Forms (round)
[V] - Forms (colors)
[V] - Positions and alignments
[V] - Extension icon
[ ] - ReadMe

[ ] project cleanup

### For future versions

[ ] Text input sanitization
[ ] Add text from selection
