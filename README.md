# Markdown It Data Attribute

Plugin created for [Quick-Start](https://github.com/PhilipTKC/quick-start)

## Description

Automatically appends a data attribute to each element in the markdown document.

Documents are converted into sections based on the headings and its contents. Each section is given a unique id. Each element in the section is given a data attribute with the id of the section.

## Usage & Example

```js
    const md = new MarkdownIt();

    md.use(dataAttributePlugin);

    const html = md.render(`
    # Heading 1

    Paragraph 1.1

    Paragraph 1.2

    | Syntax      | Description |
    | ----------- | ----------- |
    | Header      | Title       |
    | Paragraph   | Text        |

    # Heading 2

    Paragraph 2.1

    Paragraph 2.2

    | Syntax      | Description |
    | ----------- | ----------- |
    | Header      | Title       |
    | Paragraph   | Text        |

    Paragraph 2.3

    # Heading 3

    | Syntax      | Description |
    | ----------- | ----------- |
    | Header      | Title       |
    | Paragraph   | Text        |

    Paragraph 3

    # Heading 4

    | Syntax      | Description |
    | ----------- | ----------- |
    | Header      | Title       |
    | Paragraph   | Text        |

    Paragraph 4

    | Syntax      | Description |
    | ----------- | ----------- |
    | Header      | Title       |
    | Paragraph   | Text        |

    `);
```

```html
<section data-id="TkSdOBvR">
    <h1 data-key="TkSdOBvR">Heading 1</h1>
    <p data-key-content="TkSdOBvR">Paragraph 1.1</p>
    <p data-key-content="TkSdOBvR">Paragraph 1.2</p>
    <table data-key-content="TkSdOBvR">
        <thead data-key-content="TkSdOBvR">
            <tr data-key-content="TkSdOBvR">
                <th data-key-content="TkSdOBvR">Syntax</th>
                <th data-key-content="TkSdOBvR">Description</th>
            </tr>
        </thead>
        <tbody data-key-content="TkSdOBvR">
            <tr data-key-content="TkSdOBvR">
                <td data-key-content="TkSdOBvR">Header</td>
                <td data-key-content="TkSdOBvR">Title</td>
            </tr>
            <tr data-key-content="TkSdOBvR">
                <td data-key-content="TkSdOBvR">Paragraph</td>
                <td data-key-content="TkSdOBvR">Text</td>
            </tr>
        </tbody>
    </table>
</section>
<section data-id="SohrnmSf">
    <h1 data-key="SohrnmSf">Heading 2</h1>
    <p data-key-content="SohrnmSf">Paragraph 2.1</p>
    <p data-key-content="SohrnmSf">Paragraph 2.2</p>
    <table data-key-content="SohrnmSf">
        <thead data-key-content="SohrnmSf">
            <tr data-key-content="SohrnmSf">
                <th data-key-content="SohrnmSf">Syntax</th>
                <th data-key-content="SohrnmSf">Description</th>
            </tr>
        </thead>
        <tbody data-key-content="SohrnmSf">
            <tr data-key-content="SohrnmSf">
                <td data-key-content="SohrnmSf">Header</td>
                <td data-key-content="SohrnmSf">Title</td>
            </tr>
            <tr data-key-content="SohrnmSf">
                <td data-key-content="SohrnmSf">Paragraph</td>
                <td data-key-content="SohrnmSf">Text</td>
            </tr>
        </tbody>
    </table>
    <p data-key-content="SohrnmSf">Paragraph 2.3</p>
</section>
<section data-id="jiQXjDSE">
    <h1 data-key="jiQXjDSE">Heading 3</h1>
    <table data-key-content="jiQXjDSE">
        <thead data-key-content="jiQXjDSE">
            <tr data-key-content="jiQXjDSE">
                <th data-key-content="jiQXjDSE">Syntax</th>
                <th data-key-content="jiQXjDSE">Description</th>
            </tr>
        </thead>
        <tbody data-key-content="jiQXjDSE">
            <tr data-key-content="jiQXjDSE">
                <td data-key-content="jiQXjDSE">Header</td>
                <td data-key-content="jiQXjDSE">Title</td>
            </tr>
            <tr data-key-content="jiQXjDSE">
                <td data-key-content="jiQXjDSE">Paragraph</td>
                <td data-key-content="jiQXjDSE">Text</td>
            </tr>
        </tbody>
    </table>
    <p data-key-content="jiQXjDSE">Paragraph 3</p>
</section>
<section data-id="QAsWfFuN">
    <h1 data-key="QAsWfFuN">Heading 4</h1>
    <table data-key-content="QAsWfFuN">
        <thead data-key-content="QAsWfFuN">
            <tr data-key-content="QAsWfFuN">
                <th data-key-content="QAsWfFuN">Syntax</th>
                <th data-key-content="QAsWfFuN">Description</th>
            </tr>
        </thead>
        <tbody data-key-content="QAsWfFuN">
            <tr data-key-content="QAsWfFuN">
                <td data-key-content="QAsWfFuN">Header</td>
                <td data-key-content="QAsWfFuN">Title</td>
            </tr>
            <tr data-key-content="QAsWfFuN">
                <td data-key-content="QAsWfFuN">Paragraph</td>
                <td data-key-content="QAsWfFuN">Text</td>
            </tr>
        </tbody>
    </table>
    <p data-key-content="QAsWfFuN">Paragraph 4</p>
    <table data-key-content="QAsWfFuN">
        <thead data-key-content="QAsWfFuN">
            <tr data-key-content="QAsWfFuN">
                <th data-key-content="QAsWfFuN">Syntax</th>
                <th data-key-content="QAsWfFuN">Description</th>
            </tr>
        </thead>
        <tbody data-key-content="QAsWfFuN">
            <tr data-key-content="QAsWfFuN">
                <td data-key-content="QAsWfFuN">Header</td>
                <td data-key-content="QAsWfFuN">Title</td>
            </tr>
            <tr data-key-content="QAsWfFuN">
                <td data-key-content="QAsWfFuN">Paragraph</td>
                <td data-key-content="QAsWfFuN">Text</td>
            </tr>
        </tbody>
    </table>
</section>
```
