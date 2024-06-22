# json to html
this is a single file program to parse a json tree into html. 

when might you use this? lol, idk.

here's a couple examples: 

```javascript

const example1 = `{
  "tag": "div",
  "children": [
    {
      "tag": "header",
      "children": [
        {
          "tag": "h1",
          "text": "Welcome to My Website"
        }
      ]
    },
    {
      "tag": "p",
      "text": "This is a paragraph with an image:"
    },
    {
      "tag": "img",
      "src": "image.png",
      "alt": "A descriptive image"
    },
    {
      "tag": "ul",
      "children": [
        {
          "tag": "li",
          "text": "First item"
        },
        {
          "tag": "li",
          "text": "Second item"
        },
        {
          "tag": "li",
          "text": "Third item"
        }
      ]
    },
    {
      "tag": "a",
      "href": "https://www.example.com",
      "text": "Visit Example"
    },
    {
      "tag": "section",
      "children": [
        {
          "tag": "h2",
          "text": "Subheading"
        },
        {
          "tag": "p",
          "text": "Another paragraph under subheading."
        },
        {
          "tag": "table",
          "children": [
            {
              "tag": "thead",
              "children": [
                {
                  "tag": "tr",
                  "children": [
                    {
                      "tag": "th",
                      "text": "Header 1"
                    },
                    {
                      "tag": "th",
                      "text": "Header 2"
                    }
                  ]
                }
              ]
            },
            {
              "tag": "tbody",
              "children": [
                {
                  "tag": "tr",
                  "children": [
                    {
                      "tag": "td",
                      "text": "Cell 1"
                    },
                    {
                      "tag": "td",
                      "text": "Cell 2"
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ]
}`;

const example2 = `{
  "tag": "div",
  "children": [
    {
      "tag": "p",
      "text": "This is a paragraph with a link to ",
      "children": [
        {
          "tag": "a",
          "href": "https://www.example.com",
          "text": "Example"
        },
        {
          "tag": "span",
          "text": " and some more text."
        }
      ]
    },
    {
      "tag": "footer",
      "children": [
        {
          "tag": "p",
          "text": "Footer content here."
        },
        {
          "tag": "a",
          "href": "https://www.example.com",
          "text": "Contact Us"
        }
      ]
    }
  ]
}`

const example3 = `{
  "tag": "form",
  "action": "submit.php",
  "method": "POST",
  "children": [
    {
      "tag": "label",
      "for": "username",
      "text": "Username:"
    },
    {
      "tag": "input",
      "type": "text",
      "id": "username",
      "name": "username",
      "placeholder": "Enter your username"
    },
    {
      "tag": "label",
      "for": "email",
      "text": "Email:"
    },
    {
      "tag": "input",
      "type": "email",
      "id": "email",
      "name": "email",
      "placeholder": "Enter your email"
    },
    {
      "tag": "label",
      "for": "message",
      "text": "Message:"
    },
    {
      "tag": "textarea",
      "id": "message",
      "name": "message",
      "rows": 5,
      "cols": 40,
      "placeholder": "Enter your message"
    },
    {
      "tag": "button",
      "type": "submit",
      "text": "Submit"
    }
  ]
}`

const example4 = `{
  "tag": "div",
  "attributes": {
    "class": "container"
  },
  "children": [
    {
      "tag": "p",
      "text": "This is a paragraph with a link to ",
      "children": [
        {
          "tag": "a",
          "href": "https://www.example.com",
          "text": "Example",
          "onclick": "handleClick()"
        }
      ]
    },
    {
      "tag": "footer",
      "children": [
        {
          "tag": "p",
          "text": "Footer content here."
        }
      ]
    }
  ]
}`;
```

these, in order used as inputs to the function will produce the following html: 
```
example 1
--------
<div>
  <header>
    <h1>Welcome to My Website</h1>
  </header>
  <p>This is a paragraph with an image:</p>
  <img src="image.png" alt="A descriptive image" href="" rel="" type="" name="" content="" />
  <ul>
    <li>First item</li>
    <li>Second item</li>
    <li>Third item</li>
  </ul>
  <a href="https://www.example.com">Visit Example</a>
  <section>
    <h2>Subheading</h2>
    <p>Another paragraph under subheading.</p>
    <table>
      <thead>
        <tr>
          <th>Header 1</th>
          <th>Header 2</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Cell 1</td>
          <td>Cell 2</td>
        </tr>
      </tbody>
    </table>
  </section>
</div>



example 2
--------
<div>
  <p>This is a paragraph with a link to <a href="https://www.example.com">Example</a><span> and some more text.</span></p>
  <footer>
    <p>Footer content here.</p>
    <a href="https://www.example.com">Contact Us</a>
  </footer>
</div>



example 3
--------
<form action="submit.php">
  <label for="username">Username:</label>
  <input src="" alt="" href="" rel="" type="text" name="username" content="" />
  <label for="email">Email:</label>
  <input src="" alt="" href="" rel="" type="email" name="email" content="" />
  <label for="message">Message:</label>
  <textarea placeholder="Enter your message"></textarea>
  <button type="submit">Submit</button>
</form>



example 4
--------
<div class="container">
  <p>This is a paragraph with a link to <a href="https://www.example.com" onclick="handleClick()">Example</a></p>
  <footer>
    <p>Footer content here.</p>
  </footer>
</div>
```
