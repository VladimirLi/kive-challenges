## 🤳 Instagram Save Challenge (node.js, React)

## Challenge description:

_Submit your code challenge with react source and functions in one app folder. If you want to deploy it, that's a nice bonus, but it's not required, submitting only your code is fine._

- **Create a simple React app with:**
  - An input field where an Instagram post link can be entered (ie, instagram.com/p/XXXXX)
  - A button that, when clicked:
    - saves the posts image data to some cloud storage service
  - A component that renders the image from storage as soon as it is live

## Solution description:

I am not sure how to reliably solve this challenge. After multiple requests instagram requers client to log in.

I am using `instagram-save` package to download image in a google cloud function located in `functions/index.js`.

From fron-end I am using `fetch` to send a HTTP request to the function.
