const jsonTreeToHTMLList = (data, indentation = 0) => {
  let res = "";
  let node = JSON.parse(JSON.stringify(data)); // deep clone to avoid mutating original
  const indent = " ".repeat(indentation * 2);

  // to generate opening tag with optional attributes
  const generateOpeningTag = (tag, attributes = {}) => {
    let attrs = "";
    for (const [key, value] of Object.entries(attributes)) {
      if (value) {
        attrs += ` ${key}="${value}"`;
      }
    }
    return `<${tag}${attrs}>`;
  };

  // to generate self-closing tag with optional attributes
  const generateSelfClosingTag = (tag, attributes = {}) => {
    let attrs = "";
    for (const [key, value] of Object.entries(attributes)) {
      if (value) {
        attrs += ` ${key}="${value}"`;
      }
    }
    return `<${tag}${attrs} />`;
  };

  // container tags that usually/,might contain other elements
  if (["ul", "ol", "div", "header", "footer", "section", "article", "nav", "aside", "main", "table", "thead", "tbody", "tfoot", "tr"].includes(node.tag)) {
    res += `${indent}${generateOpeningTag(node.tag)}\n`;
    if (node.children) {
      node.children.forEach(child => {
        res += jsonTreeToHTMLList(child, indentation + 1);
      });
    }
    res += `${indent}</${node.tag}>\n`;

  } else if (["li", "td", "th", "p", "a", "span", "strong", "em", "b", "i", "u", "mark", "code", "pre", "h1", "h2", "h3", "h4", "h5", "h6"].includes(node.tag)) {
    // tags that might contain text and/or other inline elements
    let attributes = {};
    if (node.tag === "a" && node.href) attributes.href = node.href;
    res += `${indent}${generateOpeningTag(node.tag, attributes)}`;
    if (node.text) res += `${node.text}`;
    if (node.children) {
      node.children.forEach(child => {
        res += jsonTreeToHTMLList(child, indentation + 1).trim(); // Trim to avoid unnecessary newlines or spaces
      });
    }
    res += `</${node.tag}>\n`;

  } else if (["img", "input", "source", "link", "meta"].includes(node.tag)) {
    // self-closing tags like <img>, <input>, <source>, <link>, and <meta>
    let attributes = {
      src: node.src || "",
      alt: node.alt || "",
      href: node.href || "",
      rel: node.rel || "",
      type: node.type || "",
      name: node.name || "",
      content: node.content || ""
    };
    res += `${indent}${generateSelfClosingTag(node.tag, attributes)}\n`;

  } else if (["form", "button", "textarea", "select", "label"].includes(node.tag)) {
    // form-related tags
    let attributes = {};
    if (node.tag === "form" && node.action) attributes.action = node.action;
    if (node.tag === "button" && node.type) attributes.type = node.type;
    if (node.tag === "textarea" && node.placeholder) attributes.placeholder = node.placeholder;
    if (node.tag === "select" && node.name) attributes.name = node.name;
    if (node.tag === "label" && node.for) attributes.for = node.for;
    res += `${indent}${generateOpeningTag(node.tag, attributes)}${node.text || ""}`;
    if (node.children) {
      res += "\n";
      node.children.forEach(child => {
        res += jsonTreeToHTMLList(child, indentation + 1);
      });
      res += `${indent}`;
    }
    res += `</${node.tag}>\n`;

  } else if (node.tag === "option") {
    // opts within a <select> element
    res += `${indent}${generateOpeningTag("option", { value: node.value })}${node.text || ""}</option>\n`;

  } else if (["video", "audio", "iframe"].includes(node.tag)) {
    // media tags like <video>, <audio>, and <iframe>
    let attributes = {
      src: node.src || "",
      controls: node.controls ? "controls" : "",
      autoplay: node.autoplay ? "autoplay" : "",
      loop: node.loop ? "loop" : "",
      muted: node.muted ? "muted" : "",
      frameborder: node.frameborder || ""
    };
    res += `${indent}${generateOpeningTag(node.tag, attributes)}\n`;
    if (node.children) {
      node.children.forEach(child => {
        res += jsonTreeToHTMLList(child, indentation + 1);
      });
    }
    res += `${indent}</${node.tag}>\n`;

  } else {
    // default case for any unsupported tags, rendering as text
    res += `${indent}${node.text || ""}\n`;
  }

  return res;
};

const data = `{
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
        }
      ]
    },
    {
      "tag": "footer",
      "text": "Footer content here."
    }
  ]
}`;

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
      "text": "Footer content here."
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
console.log("example 1")
console.log("--------")
let result = jsonTreeToHTMLList(JSON.parse(example1), 0);
console.log(result);

console.log("\n\nexample 2");
console.log("--------")
result = jsonTreeToHTMLList(JSON.parse(example2), 0);
console.log(result);

console.log("\n\nexample 3");
console.log("--------")
result = jsonTreeToHTMLList(JSON.parse(example3), 0);
console.log(result);
