# JsonFilesKeyComparer
A simple node script that takes two json files and compare their keys and shows differences. It also shows which keys does not have any values.

Typical use is to find differences between two language files and to find out if one file is missing translations.

```
Execute like so: node difflangFiles.js "C:\full\path\to\en.json" "C:\full\path\to\sv.json"
```
## Example output
```
Compare:
   A: en.json
   B: sv.json

 A->!B: buttons.UPDATE
 A->!B: validity_component.VALIDITY_TEXT
 A->!B: validity_component.VALIDITY_EXPIRED
 A->!B: terms_and_conditions.TITLE
 A->!B: terms_and_conditions.CONTENT
 A->!B: terms_and_conditions.ACCEPT_BUTTON
 A->!B: terms_and_conditions.ACCEPT_VERIFY
 [A] Missing value: help_page.LINK_NAME_3
 [A] Missing value: help_page.LINK_MAIL_3
 [B] Missing value: help_page.LINK_NAME_3
 [B] Missing value: help_page.LINK_MAIL_3

 621 keys were compared
 A and B does not contain the same keys
 ```
