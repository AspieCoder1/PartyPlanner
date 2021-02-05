# Documentation Service

Team X1 backend service documentation app made with Docz.
When adding an entry to the file please create the `.mdx` file in the following format.
This ensures consistency.
```markdown
---
name: Name of page
menu: which menu you want to page to go in, see the list on the getting started page.
---
# What the request does goes here (e.g. get current user)
A more detailed description of what the method does
- url
- method
- authentication

## Parameters
Table to show all parameters the endpoint has
## Headers
Any headers needed. In our case it is empty or an authentication header
## Success Response
- Code: `200 OK`
### Example success response
details about request used and example response goes here
## Error
Error codes and messages goes here
## Notes
Any important notes about the endpoint
```