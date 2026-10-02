# JavaScript Files — Complete Guide

This document explains how JavaScript works with files:

* Selecting one file
* Selecting multiple files
* Understanding `File`
* Understanding `FileList`
* File properties
* File validation
* Image preview
* `URL.createObjectURL()`
* `FileReader`
* `Blob`
* `FormData`
* Uploading files with `fetch()`
* Uploading to Django REST Framework
* Handling multiple files
* Drag and drop
* Upload progress
* Resetting file inputs
* File size conversion
* Frontend and backend validation
* Common mistakes
* React file uploads
* Complete cheat sheet

---

# 1. What is a File in JavaScript?

A **File** represents a file selected by the user from their computer.

For example, the user may select:

```text
profile.jpg
resume.pdf
document.docx
video.mp4
data.csv
```

When the user selects a file through:

```html
<input type="file">
```

JavaScript can access the selected file.

```javascript
const fileInput = document.querySelector("#fileInput");

const file = fileInput.files[0];

console.log(file);
```

The variable `file` is a JavaScript `File` object.

---

# 2. Basic File Input

HTML:

```html
<input type="file" id="fileInput">
```

JavaScript:

```javascript
const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", function () {

    // Get the first selected file
    const file = fileInput.files[0];

    console.log(file);

});
```

## What does `change` mean?

```javascript
fileInput.addEventListener("change", function () {
```

It means:

> Run this function when the value of the file input changes.

Normally, this happens when the user selects a file.

---

# 3. Understanding `fileInput.files`

This is extremely important.

```javascript
fileInput.files
```

returns a:

```text
FileList
```

A `FileList` contains the files selected by the user.

Example:

```javascript
console.log(fileInput.files);
```

You might see something conceptually like:

```text
FileList {
    0: File,
    length: 1
}
```

If the user selects three files:

```text
FileList {
    0: File,
    1: File,
    2: File,
    length: 3
}
```

---

# 4. Getting One File

If only one file is selected:

```javascript
const file = fileInput.files[0];
```

`[0]` means:

> Give me the first file.

Example:

```javascript
const file = fileInput.files[0];

console.log(file.name);
```

---

# 5. Checking Whether a File Was Selected

Always check this before working with a file.

```javascript
const file = fileInput.files[0];

if (!file) {
    console.log("No file selected.");
    return;
}
```

Why?

Because if nothing was selected:

```javascript
fileInput.files[0]
```

will give:

```javascript
undefined
```

Therefore this would cause a problem:

```javascript
console.log(file.name);
```

because `file` does not exist.

---

# 6. The File Object

A `File` is an object containing information about a file.

For example:

```javascript
const file = fileInput.files[0];

console.log(file);
```

A file has useful properties.

Important ones include:

```javascript
file.name
file.size
file.type
file.lastModified
file.lastModifiedDate
```

---

# 7. `file.name`

Gets the filename.

```javascript
console.log(file.name);
```

Example:

```text
profile.jpg
```

Another example:

```javascript
console.log(file.name);
```

Output:

```text
resume.pdf
```

---

# 8. `file.size`

Gets the file size in **bytes**.

```javascript
console.log(file.size);
```

Example:

```text
204800
```

This means approximately:

```text
200 KB
```

because:

```text
1 KB = 1024 bytes
```

---

# 9. Convert Bytes to KB

```javascript
const sizeKB = file.size / 1024;

console.log(sizeKB);
```

For better formatting:

```javascript
const sizeKB = (file.size / 1024).toFixed(2);

console.log(`${sizeKB} KB`);
```

Example:

```text
250.35 KB
```

---

# 10. Convert Bytes to MB

```javascript
const sizeMB = file.size / (1024 * 1024);

console.log(sizeMB);
```

Better:

```javascript
const sizeMB = (file.size / (1024 * 1024)).toFixed(2);

console.log(`${sizeMB} MB`);
```

---

# 11. File Size Function

You can create a reusable function:

```javascript
function formatFileSize(bytes) {

    if (bytes < 1024) {
        return `${bytes} Bytes`;
    }

    if (bytes < 1024 * 1024) {
        return `${(bytes / 1024).toFixed(2)} KB`;
    }

    if (bytes < 1024 * 1024 * 1024) {
        return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
    }

    return `${(bytes / (1024 * 1024 * 1024)).toFixed(2)} GB`;
}
```

Use:

```javascript
console.log(formatFileSize(file.size));
```

---

# 12. `file.type`

Returns the MIME type of the file.

```javascript
console.log(file.type);
```

Examples:

```text
image/jpeg
image/png
image/webp
application/pdf
text/plain
video/mp4
audio/mpeg
```

For example:

```javascript
if (file.type === "image/png") {
    console.log("This is a PNG image.");
}
```

---

# 13. Checking Whether a File Is an Image

Instead of checking every possible image type:

```javascript
if (file.type.startsWith("image/")) {
    console.log("This is an image.");
}
```

Why?

Because:

```text
image/png
image/jpeg
image/webp
image/gif
image/svg+xml
```

all start with:

```text
image/
```

---

# 14. Checking for PDF

```javascript
if (file.type === "application/pdf") {
    console.log("This is a PDF.");
}
```

---

# 15. Checking Multiple File Types

Example:

```javascript
const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

if (!allowedTypes.includes(file.type)) {
    console.log("Invalid file type.");
    return;
}
```

---

# 16. `file.lastModified`

Returns the last modified time as a timestamp.

```javascript
console.log(file.lastModified);
```

You can convert it into a readable date:

```javascript
const date = new Date(file.lastModified);

console.log(date);
```

---

# 17. Display File Information

```javascript
const file = fileInput.files[0];

if (!file) {
    return;
}

console.log("Name:", file.name);
console.log("Size:", file.size);
console.log("Type:", file.type);
console.log("Last modified:", new Date(file.lastModified));
```

---

# 18. The `accept` Attribute

HTML:

```html
<input
    type="file"
    id="fileInput"
    accept="image/*"
>
```

This tells the browser:

> Prefer/show image files when the user chooses a file.

---

# 19. Accept Only Specific Images

```html
<input
    type="file"
    accept="image/png,image/jpeg,image/webp"
>
```

---

# 20. Accept PDF

```html
<input
    type="file"
    accept="application/pdf"
>
```

---

# 21. Accept Images and PDF

```html
<input
    type="file"
    accept="image/*,application/pdf"
>
```

Important:

`accept` is **not security**.

A malicious or modified request can bypass frontend restrictions.

Therefore:

```text
Frontend validation
        +
Backend validation
```

should be used.

---

# 22. Selecting Multiple Files

HTML:

```html
<input
    type="file"
    id="fileInput"
    multiple
>
```

The important part is:

```html
multiple
```

Without it:

```html
<input type="file">
```

the user normally selects one file.

With it:

```html
<input type="file" multiple>
```

the user can select several files.

---

# 23. Getting Multiple Files

```javascript
const files = fileInput.files;

console.log(files);
```

You can loop through them:

```javascript
for (const file of files) {

    console.log(file.name);
    console.log(file.size);
    console.log(file.type);

}
```

---

# 24. Convert FileList to Array

A `FileList` is array-like, but converting it to an actual array is often useful.

```javascript
const files = [...fileInput.files];
```

Now you can use:

```javascript
map()
filter()
forEach()
find()
some()
every()
```

Example:

```javascript
const files = [...fileInput.files];

files.forEach(file => {
    console.log(file.name);
});
```

---

# 25. Filter Images

```javascript
const files = [...fileInput.files];

const images = files.filter(file =>
    file.type.startsWith("image/")
);

console.log(images);
```

---

# 26. Get Only File Names

```javascript
const files = [...fileInput.files];

const names = files.map(file => file.name);

console.log(names);
```

---

# 27. Validate File Size

Suppose the maximum allowed size is 5 MB.

```javascript
const maxSize = 5 * 1024 * 1024;
```

Explanation:

```text
5
× 1024
× 1024
= 5 MB
```

Then:

```javascript
if (file.size > maxSize) {
    console.log("File is too large.");
    return;
}
```

---

# 28. Complete File Validation

```javascript
const file = fileInput.files[0];

if (!file) {
    console.log("Please select a file.");
    return;
}

// Allowed file types
const allowedTypes = [
    "image/jpeg",
    "image/png",
    "image/webp"
];

// Maximum size = 5 MB
const maxSize = 5 * 1024 * 1024;

// Check file type
if (!allowedTypes.includes(file.type)) {
    console.log("Invalid file type.");
    return;
}

// Check file size
if (file.size > maxSize) {
    console.log("File must be less than 5 MB.");
    return;
}

console.log("File is valid.");
```

---

# 29. Image Preview Before Upload

One of the most useful file features is showing an image before sending it to the server.

HTML:

```html
<input type="file" id="fileInput">

<img
    id="preview"
    width="100"
    height="100"
    alt="Preview"
>
```

JavaScript:

```javascript
const fileInput = document.querySelector("#fileInput");
const preview = document.querySelector("#preview");

fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    if (!file.type.startsWith("image/")) {
        console.log("Please select an image.");
        return;
    }

    const imageURL = URL.createObjectURL(file);

    preview.src = imageURL;

});
```

---

# 30. What Is `URL.createObjectURL()`?

```javascript
URL.createObjectURL(file)
```

creates a temporary URL that allows the browser to access the selected file.

Example:

```javascript
const imageURL = URL.createObjectURL(file);

console.log(imageURL);
```

It may look something like:

```text
blob:http://127.0.0.1:5500/abc123...
```

This is called a **Blob URL** or **Object URL**.

---

# 31. Important Difference: Object URL vs Server URL

This distinction is very important.

When you do:

```javascript
URL.createObjectURL(file)
```

you get a temporary browser URL.

Example:

```text
blob:http://127.0.0.1:5500/abc123
```

It is useful for:

```text
Previewing
Reading
Displaying
```

But it is not your permanent uploaded file.

After uploading to Django, you might receive:

```text
/media/cvs/nzegge.dev.png
```

That is the server-side file URL.

Therefore:

```text
Selected File
     ↓
createObjectURL()
     ↓
Temporary preview
```

and:

```text
Selected File
     ↓
FormData
     ↓
POST
     ↓
Django
     ↓
Media storage
     ↓
Permanent server file
```

---

# 32. Releasing an Object URL

When you create an object URL:

```javascript
const imageURL = URL.createObjectURL(file);
```

you can later release it:

```javascript
URL.revokeObjectURL(imageURL);
```

Example:

```javascript
const imageURL = URL.createObjectURL(file);

preview.src = imageURL;

// Later, when you no longer need it
URL.revokeObjectURL(imageURL);
```

For many temporary previews, releasing URLs is good practice.

---

# 33. `FileReader`

Another way to read files in JavaScript is:

```javascript
FileReader
```

Example:

```javascript
const reader = new FileReader();
```

It can read the contents of files.

---

# 34. Reading a File as Text

Useful for:

```text
.txt
.csv
.json
```

Example:

```javascript
const fileInput = document.querySelector("#fileInput");

fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    const reader = new FileReader();

    reader.onload = function () {

        console.log(reader.result);

    };

    reader.readAsText(file);

});
```

---

# 35. `reader.readAsText()`

```javascript
reader.readAsText(file);
```

means:

> Read the contents of the file as text.

For example, if `test.txt` contains:

```text
Hello Charles
Welcome to JavaScript.
```

then:

```javascript
console.log(reader.result);
```

will produce:

```text
Hello Charles
Welcome to JavaScript.
```

---

# 36. Reading JSON Files

Suppose:

```text
data.json
```

contains:

```json
{
    "name": "Nzegge",
    "age": 25
}
```

JavaScript:

```javascript
const reader = new FileReader();

reader.onload = function () {

    const data = JSON.parse(reader.result);

    console.log(data.name);
    console.log(data.age);

};

reader.readAsText(file);
```

---

# 37. `readAsDataURL()`

Another method is:

```javascript
reader.readAsDataURL(file);
```

This converts the file into a Data URL.

Useful for displaying images.

Example:

```javascript
const reader = new FileReader();

reader.onload = function () {

    preview.src = reader.result;

};

reader.readAsDataURL(file);
```

---

# 38. `createObjectURL()` vs `FileReader`

For image previews, both can work.

### `URL.createObjectURL()`

```javascript
const url = URL.createObjectURL(file);

preview.src = url;
```

Good for:

```text
quick previews
large files
temporary browser access
```

### `FileReader`

```javascript
const reader = new FileReader();

reader.onload = () => {
    preview.src = reader.result;
};

reader.readAsDataURL(file);
```

Useful when you actually need the file contents in JavaScript.

Simple rule:

```text
Need quick preview?
→ createObjectURL()

Need the file contents?
→ FileReader
```

---

# 39. What Is a Blob?

`Blob` means:

> Binary Large Object

A `Blob` represents raw binary data.

Files are closely related to blobs.

For example:

```javascript
const blob = new Blob(
    ["Hello World"],
    { type: "text/plain" }
);

console.log(blob);
```

---

# 40. Blob Example

```javascript
const blob = new Blob(
    ["Hello World"],
    {
        type: "text/plain"
    }
);

const url = URL.createObjectURL(blob);

console.log(url);
```

The browser can create a temporary URL for the blob.

---

# 41. File vs Blob

A useful way to remember:

```text
Blob
=
raw binary data

File
=
Blob + filename + file metadata
```

A `File` is therefore more specific than a normal `Blob`.

---

# 42. FormData

`FormData` is extremely important for uploading files.

Create it:

```javascript
const formData = new FormData();
```

Add a file:

```javascript
formData.append("cv", file);
```

Now the request contains:

```text
cv → selected file
```

---

# 43. Adding Normal Data to FormData

You can send normal fields too.

```javascript
const formData = new FormData();

formData.append("username", "nzegge");
formData.append("email", "test@example.com");
formData.append("cv", file);
```

So `FormData` can contain:

```text
text fields
+
files
```

---

# 44. Upload One File with Fetch

```javascript
const file = fileInput.files[0];

const formData = new FormData();

formData.append("cv", file);

const response = await fetch(
    "http://127.0.0.1:8000/file_demo/upload-cv/",
    {
        method: "POST",
        body: formData
    }
);

const data = await response.json();

console.log(data);
```

---

# 45. VERY IMPORTANT: Do Not Manually Set Content-Type

When using:

```javascript
FormData
```

do NOT normally do this:

```javascript
headers: {
    "Content-Type": "multipart/form-data"
}
```

Instead:

```javascript
fetch(url, {
    method: "POST",
    body: formData
});
```

The browser automatically creates the correct:

```text
multipart/form-data
```

boundary.

This is an important file-upload rule.

---

# 46. Sending JWT with FormData

If your Django API requires JWT authentication:

```javascript
const token = "YOUR_ACCESS_TOKEN";

const response = await fetch(
    "http://127.0.0.1:8000/file_demo/upload-cv/",
    {
        method: "POST",

        headers: {
            Authorization: `Bearer ${token}`
        },

        body: formData
    }
);
```

Notice that we only set:

```javascript
Authorization
```

We don't manually set:

```javascript
Content-Type
```

---

# 47. Complete One-File Upload

```javascript
const fileInput = document.querySelector("#fileInput");
const saveButton = document.querySelector("#saveButton");
const preview = document.querySelector("#preview");

fileInput.addEventListener("change", function () {

    const file = fileInput.files[0];

    if (!file) {
        return;
    }

    // Only allow images
    if (!file.type.startsWith("image/")) {
        console.log("Please select an image.");
        fileInput.value = "";
        return;
    }

    // Maximum size = 5 MB
    const maxSize = 5 * 1024 * 1024;

    if (file.size > maxSize) {
        console.log("Image is too large.");
        fileInput.value = "";
        return;
    }

    // Temporary preview
    const imageURL = URL.createObjectURL(file);

    preview.src = imageURL;

    console.log("Name:", file.name);
    console.log("Size:", file.size);
    console.log("Type:", file.type);
});


saveButton.addEventListener("click", async function () {

    const file = fileInput.files[0];

    if (!file) {
        console.log("Please select a file.");
        return;
    }

    // Create multipart/form-data
    const formData = new FormData();

    // "cv" must match the Django field name
    formData.append("cv", file);

    try {

        const response = await fetch(
            "http://127.0.0.1:8000/file_demo/upload-cv/",
            {
                method: "POST",
                body: formData
            }
        );

        const data = await response.json();

        if (!response.ok) {

            console.log("Upload failed:", data);

            return;
        }

        console.log("Upload successful:", data);

        // Example:
        // data.cv = "/media/cvs/nzegge.dev.png"

        if (data.cv) {
            preview.src =
                `http://127.0.0.1:8000${data.cv}`;
        }

    } catch (error) {

        console.error("Upload error:", error);

    }

});
```

---

# 48. Django Receives the File

If JavaScript sends:

```javascript
formData.append("cv", file);
```

Django can access it through:

```python
request.FILES
```

For one file:

```python
file = request.FILES["cv"]
```

Or:

```python
file = request.FILES.get("cv")
```

The second approach is safer if the field might be missing.

---

# 49. Django Multiple Files

HTML:

```html
<input
    type="file"
    id="fileInput"
    multiple
>
```

JavaScript:

```javascript
const files = fileInput.files;

const formData = new FormData();

for (const file of files) {

    formData.append("files", file);

}
```

Django:

```python
files = request.FILES.getlist("files")
```

Now:

```python
for file in files:
    print(file.name)
```

---

# 50. Complete Multiple File Upload

```javascript
const fileInput = document.querySelector("#fileInput");

async function uploadFiles() {

    const files = fileInput.files;

    if (files.length === 0) {
        console.log("Select at least one file.");
        return;
    }

    const formData = new FormData();

    for (const file of files) {

        // Validate file type
        if (!file.type.startsWith("image/")) {
            console.log(
                `${file.name} is not an image.`
            );

            continue;
        }

        // Add file
        formData.append("files", file);
    }

    const response = await fetch(
        "http://127.0.0.1:8000/file_demo/upload/",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    console.log(data);
}
```

---

# 51. Multiple Files on Django

```python
files = request.FILES.getlist("files")

for file in files:

    print("Name:", file.name)
    print("Size:", file.size)
    print("Type:", file.content_type)
```

Important:

```python
request.FILES["files"]
```

gets one uploaded file.

While:

```python
request.FILES.getlist("files")
```

gets all files having that field name.

---

# 52. Multiple Image Preview

HTML:

```html
<input
    type="file"
    id="fileInput"
    multiple
    accept="image/*"
>

<div id="previewContainer"></div>
```

JavaScript:

```javascript
const fileInput =
    document.querySelector("#fileInput");

const previewContainer =
    document.querySelector("#previewContainer");


fileInput.addEventListener("change", function () {

    // Remove old previews
    previewContainer.innerHTML = "";

    const files = [...fileInput.files];

    for (const file of files) {

        // Only preview images
        if (!file.type.startsWith("image/")) {
            continue;
        }

        const image =
            document.createElement("img");

        // Create temporary URL
        const imageURL =
            URL.createObjectURL(file);

        image.src = imageURL;

        image.width = 100;
        image.height = 100;

        previewContainer.appendChild(image);

    }

});
```

---

# 53. Drag and Drop Files

HTML:

```html
<div id="dropZone">
    Drop files here
</div>
```

JavaScript:

```javascript
const dropZone =
    document.querySelector("#dropZone");


// Prevent browser from opening the file
dropZone.addEventListener("dragover", function (event) {

    event.preventDefault();

});


// When files are dropped
dropZone.addEventListener("drop", function (event) {

    event.preventDefault();

    const files = event.dataTransfer.files;

    console.log(files);

});
```

---

# 54. Understanding `dataTransfer.files`

When a user drags files onto a drop zone:

```javascript
event.dataTransfer.files
```

contains the dropped files.

It is similar to:

```javascript
fileInput.files
```

---

# 55. Upload Progress

`fetch()` does not provide a simple upload-progress API in the same way `XMLHttpRequest` does.

For traditional upload progress, you can use:

```javascript
XMLHttpRequest
```

Example:

```javascript
const xhr = new XMLHttpRequest();

xhr.open(
    "POST",
    "http://127.0.0.1:8000/file_demo/upload/"
);


xhr.upload.addEventListener(
    "progress",
    function (event) {

        if (event.lengthComputable) {

            const percent =
                (event.loaded / event.total) * 100;

            console.log(
                `${percent.toFixed(2)}%`
            );

        }

    }
);


xhr.onload = function () {

    console.log("Upload finished.");

};


xhr.onerror = function () {

    console.log("Upload failed.");

};


xhr.send(formData);
```

---

# 56. Displaying Upload Progress

HTML:

```html
<progress
    id="progress"
    value="0"
    max="100"
>
</progress>

<span id="progressText">0%</span>
```

JavaScript:

```javascript
const progress =
    document.querySelector("#progress");

const progressText =
    document.querySelector("#progressText");


xhr.upload.addEventListener(
    "progress",
    function (event) {

        if (!event.lengthComputable) {
            return;
        }

        const percent =
            (event.loaded / event.total) * 100;

        progress.value = percent;

        progressText.textContent =
            `${percent.toFixed(0)}%`;

    }
);
```

---

# 57. Reset the File Input

To remove the selected file:

```javascript
fileInput.value = "";
```

Example:

```javascript
if (file.size > maxSize) {

    console.log("File too large.");

    fileInput.value = "";

    return;
}
```

---

# 58. Reset Everything After Upload

```javascript
fileInput.value = "";

preview.src = "";
```

You might also reset:

```javascript
previewContainer.innerHTML = "";
```

---

# 59. FormData With Several Fields

Example:

```javascript
const formData = new FormData();

formData.append("username", "nzegge");
formData.append("email", "test@example.com");
formData.append("description", "Profile image");
formData.append("cv", file);
```

This is useful for forms containing:

```text
username
email
phone
description
image
CV
documents
```

---

# 60. Important FormData Rule

The name in:

```javascript
formData.append("cv", file);
```

must correspond to the backend field.

For Django:

```python
class User(models.Model):

    cv = models.FileField(...)
```

then:

```javascript
formData.append("cv", file);
```

is correct.

If the Django field is:

```python
profile_image
```

then JavaScript should use:

```javascript
formData.append("profile_image", file);
```

---

# 61. File Upload With a Django Serializer

Example:

```python
class CVUploadSerializer(serializers.ModelSerializer):

    upload_at = serializers.DateTimeField(
        read_only=True
    )

    class Meta:
        model = User
        fields = [
            "cv",
            "upload_at"
        ]

    def update(
        self,
        instance,
        validated_data
    ):

        instance.upload_at = timezone.now()

        return super().update(
            instance,
            validated_data
        )
```

JavaScript:

```javascript
const formData = new FormData();

formData.append("cv", file);
```

The serializer can then receive the uploaded file.

---

# 62. File Upload Request Flow

The complete flow is:

```text
USER
 │
 │ selects image
 ▼
<input type="file">
 │
 ▼
File object
 │
 ├── name
 ├── size
 ├── type
 └── lastModified
 │
 ├───────────────┐
 │               │
 ▼               ▼
Preview          FormData
 │               │
 │               ▼
 │             fetch()
 │               │
 │               ▼
 │            Django
 │               │
 │               ▼
 │          request.FILES
 │               │
 │               ▼
 │          Serializer
 │               │
 │               ▼
 │          ImageField
 │               │
 │               ▼
 │         MEDIA_ROOT
 │
 ▼
Browser preview
```

---

# 63. Temporary vs Permanent File

This is one of the most important concepts.

### Temporary browser preview

```javascript
const url = URL.createObjectURL(file);
```

The browser creates:

```text
blob:http://...
```

This is temporary.

### Permanent server storage

After upload:

```text
Django
   ↓
MEDIA_ROOT
   ↓
media/cvs/example.png
```

The database normally stores the file's path/name.

For example:

```text
cvs/example.png
```

---

# 64. Why Does My Image Disappear After Refresh?

Suppose:

```javascript
preview.src =
    URL.createObjectURL(file);
```

The image appears.

Then you refresh the page.

The image disappears.

Why?

Because:

```javascript
URL.createObjectURL(file)
```

created a temporary browser URL.

It did not save the image to your server.

To persist it:

```text
1. Select image
2. Preview image
3. Upload image
4. Django saves image
5. Django returns image URL
6. On page reload, request the saved image URL
```

---

# 65. Loading a Saved Image From Django

Suppose Django returns:

```json
{
    "cv": "/media/cvs/nzegge.dev.png",
    "upload_at": "2026-09-30T10:20:01Z"
}
```

JavaScript:

```javascript
const API_URL =
    "http://127.0.0.1:8000";


async function loadSavedImage() {

    const response = await fetch(
        `${API_URL}/file_demo/profile/`
    );

    const data = await response.json();

    if (data.cv) {

        preview.src =
            `${API_URL}${data.cv}`;

    }

}


loadSavedImage();
```

Now refreshing the page can restore the saved image.

---

# 66. CORS and File Uploads

Suppose your frontend runs on:

```text
http://127.0.0.1:5500
```

and Django runs on:

```text
http://127.0.0.1:8000
```

These are different origins because the ports differ.

Therefore, the browser may require CORS permission.

Django configuration commonly uses:

```python
CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:5500",
]
```

Notice:

```text
NO trailing slash
```

Correct:

```text
http://127.0.0.1:5500
```

Not:

```text
http://127.0.0.1:5500/
```

---

# 67. CORS vs CSRF

Do not confuse these two.

### CORS

Controls whether a browser is allowed to make/read cross-origin requests.

Example:

```text
Frontend:
127.0.0.1:5500

Backend:
127.0.0.1:8000
```

### CSRF

Protects authenticated browser requests that use cookie/session authentication.

For example:

```text
SessionAuthentication
+
POST
+
CSRF protection
```

can result in:

```text
403 CSRF Failed
```

CORS and CSRF solve different problems.

---

# 68. Common File Upload Mistake

Wrong:

```javascript
fetch(url, {
    method: "POST",
    headers: {
        "Content-Type": "multipart/form-data"
    },
    body: formData
});
```

Usually avoid manually setting this.

Correct:

```javascript
fetch(url, {
    method: "POST",
    body: formData
});
```

The browser sets the correct multipart boundary.

---

# 69. Common Mistake: Sending File as JSON

Do not do:

```javascript
fetch(url, {
    method: "POST",

    headers: {
        "Content-Type": "application/json"
    },

    body: JSON.stringify({
        cv: file
    })
});
```

A normal JSON request is not the normal way to upload a binary file.

Use:

```javascript
const formData = new FormData();

formData.append("cv", file);
```

Then:

```javascript
fetch(url, {
    method: "POST",
    body: formData
});
```

---

# 70. Common Mistake: Forgetting `[0]`

If you want one file:

```javascript
const file = fileInput.files[0];
```

Not:

```javascript
const file = fileInput.files;
```

The first gives you a `File`.

The second gives you a `FileList`.

---

# 71. Common Mistake: Assuming `FileList` Is an Array

You can use:

```javascript
for (const file of fileInput.files) {
    console.log(file.name);
}
```

But if you want array methods such as:

```javascript
map()
filter()
find()
```

convert it:

```javascript
const files = [...fileInput.files];
```

Then:

```javascript
const images = files.filter(
    file => file.type.startsWith("image/")
);
```

---

# 72. Common Mistake: Trusting Frontend Validation

This:

```javascript
if (file.size > maxSize) {
    return;
}
```

is useful.

But it is not security.

A user can bypass JavaScript.

Therefore the backend should also check:

```text
file type
file size
file extension
number of files
user permissions
```

---

# 73. File Extension vs MIME Type

Filename:

```text
photo.jpg
```

Extension:

```text
.jpg
```

MIME type:

```text
image/jpeg
```

JavaScript:

```javascript
console.log(file.name);
console.log(file.type);
```

Do not rely only on:

```javascript
file.name.endsWith(".jpg")
```

because a filename can be misleading.

Backend validation is especially important.

---

# 74. One File vs Multiple Files

## One file

HTML:

```html
<input type="file" id="fileInput">
```

JavaScript:

```javascript
const file = fileInput.files[0];

formData.append("cv", file);
```

Django:

```python
file = request.FILES.get("cv")
```

---

## Multiple files

HTML:

```html
<input
    type="file"
    id="fileInput"
    multiple
>
```

JavaScript:

```javascript
for (const file of fileInput.files) {
    formData.append("files", file);
}
```

Django:

```python
files = request.FILES.getlist("files")
```

---

# 75. React File Input

In React you can use:

```jsx
<input
    type="file"
    onChange={handleFileChange}
/>
```

State:

```javascript
const [file, setFile] = useState(null);
```

Handler:

```javascript
function handleFileChange(event) {

    const selectedFile =
        event.target.files[0];

    setFile(selectedFile);

}
```

Now:

```javascript
console.log(file);
```

contains the selected `File`.

---

# 76. React Multiple Files

State:

```javascript
const [files, setFiles] = useState([]);
```

Handler:

```javascript
function handleFileChange(event) {

    const selectedFiles =
        [...event.target.files];

    setFiles(selectedFiles);

}
```

Then:

```javascript
<input
    type="file"
    multiple
    onChange={handleFileChange}
/>
```

---

# 77. React FormData

Suppose:

```javascript
const [file, setFile] = useState(null);
```

Upload:

```javascript
async function uploadFile() {

    const formData = new FormData();

    formData.append("cv", file);

    const response = await fetch(
        "http://127.0.0.1:8000/file_demo/upload-cv/",
        {
            method: "POST",
            body: formData
        }
    );

    const data = await response.json();

    console.log(data);
}
```

---

# 78. React Image Preview

State:

```javascript
const [preview, setPreview] = useState(null);
```

Handler:

```javascript
function handleFileChange(event) {

    const file = event.target.files[0];

    if (!file) {
        return;
    }

    setFile(file);

    const imageURL =
        URL.createObjectURL(file);

    setPreview(imageURL);

}
```

Display:

```jsx
{preview && (
    <img
        src={preview}
        width="100"
        height="100"
        alt="Preview"
    />
)}
```

---

# 79. Important React Concept

If you have:

```javascript
const [formData, setFormData] = useState({
    cv: null
});
```

then `cv` should hold the actual `File` object:

```javascript
setFormData({
    ...formData,
    cv: file
});
```

Later:

```javascript
const data = new FormData();

data.append("cv", formData.cv);
```

Do not convert the file to a normal string just to store it.

---

# 80. Useful File Methods and APIs

There isn't one giant `File` method list like an array has. Much of file handling uses related browser APIs.

Important tools to know:

```text
File
FileList
Blob
FileReader
FormData
URL.createObjectURL()
URL.revokeObjectURL()
DataTransfer
<input type="file">
```

---

# 81. Important File Properties

```javascript
file.name
file.size
file.type
file.lastModified
```

Examples:

```javascript
console.log(file.name);
console.log(file.size);
console.log(file.type);
console.log(file.lastModified);
```

---

# 82. Useful File/Browser APIs

### File

```javascript
const file = fileInput.files[0];
```

### FileList

```javascript
const files = fileInput.files;
```

### Blob

```javascript
const blob = new Blob(...);
```

### FileReader

```javascript
const reader = new FileReader();
```

### FormData

```javascript
const formData = new FormData();
```

### Object URL

```javascript
URL.createObjectURL(file);
```

### Release Object URL

```javascript
URL.revokeObjectURL(url);
```

### Drag and drop

```javascript
event.dataTransfer.files;
```

---

# 83. Complete Mental Model

Remember these five concepts:

```text
1. File
   ↓
   The actual selected file object.

2. FileList
   ↓
   The collection of selected files.

3. Blob
   ↓
   Raw binary data.

4. FormData
   ↓
   Packages files + normal fields for HTTP upload.

5. Object URL
   ↓
   Temporary browser URL for accessing a file/blob.
```

---

# 84. The Complete Upload Picture

```text
             USER
               │
               │ selects file
               ▼
       <input type="file">
               │
               ▼
             File
               │
       ┌───────┴────────┐
       │                │
       ▼                ▼
   Preview           FormData
       │                │
       │                ▼
       │              fetch()
       │                │
       │                ▼
       │             Django
       │                │
       │                ▼
       │          request.FILES
       │                │
       │                ▼
       │           Serializer
       │                │
       │                ▼
       │          ImageField/FileField
       │                │
       │                ▼
       │          MEDIA_ROOT
       │
       ▼
 Temporary preview
```

---

# 85. File Upload Cheat Sheet

## Select one file

```javascript
const file = fileInput.files[0];
```

## Select multiple files

```javascript
const files = fileInput.files;
```

## Convert to array

```javascript
const files = [...fileInput.files];
```

## File name

```javascript
file.name
```

## File size

```javascript
file.size
```

## File type

```javascript
file.type
```

## Last modified

```javascript
file.lastModified
```

## Check image

```javascript
file.type.startsWith("image/")
```

## Create preview

```javascript
const url = URL.createObjectURL(file);

preview.src = url;
```

## Release preview URL

```javascript
URL.revokeObjectURL(url);
```

## Read text

```javascript
const reader = new FileReader();

reader.onload = () => {
    console.log(reader.result);
};

reader.readAsText(file);
```

## Read as Data URL

```javascript
reader.readAsDataURL(file);
```

## Create FormData

```javascript
const formData = new FormData();
```

## Add one file

```javascript
formData.append("cv", file);
```

## Add multiple files

```javascript
for (const file of files) {
    formData.append("files", file);
}
```

## Upload

```javascript
fetch(url, {
    method: "POST",
    body: formData
});
```

## Django one file

```python
request.FILES.get("cv")
```

## Django multiple files

```python
request.FILES.getlist("files")
```

## Reset input

```javascript
fileInput.value = "";
```

---

# 86. Most Important Rules to Remember

### Rule 1

A selected file is a:

```javascript
File
```

### Rule 2

Selected files are contained in:

```javascript
FileList
```

### Rule 3

For one file:

```javascript
fileInput.files[0]
```

### Rule 4

For multiple files:

```javascript
fileInput.files
```

### Rule 5

Use:

```javascript
FormData
```

to upload files through normal HTTP requests.

### Rule 6

Do not manually set:

```text
Content-Type: multipart/form-data
```

when using `FormData` with `fetch()`.

### Rule 7

`URL.createObjectURL()` gives you a **temporary** browser URL.

### Rule 8

Uploading to Django gives you **server-side persistent storage**.

### Rule 9

Frontend validation is for user experience.

Backend validation is necessary for security.

### Rule 10

For Django multiple files:

```python
request.FILES.getlist("files")
```

---

# 87. The Simplest File Upload Example

HTML:

```html
<input
    type="file"
    id="fileInput"
>

<img
    id="preview"
    width="100"
    height="100"
>

<button id="uploadButton">
    Upload
</button>
```

JavaScript:

```javascript
const fileInput =
    document.querySelector("#fileInput");

const preview =
    document.querySelector("#preview");

const uploadButton =
    document.querySelector("#uploadButton");


// ============================================
// Select file
// ============================================

fileInput.addEventListener("change", function () {

    const file =
        fileInput.files[0];

    if (!file) {
        return;
    }


    // ========================================
    // Validate image
    // ========================================

    if (!file.type.startsWith("image/")) {

        console.log(
            "Please select an image."
        );

        fileInput.value = "";

        return;
    }


    // ========================================
    // Show temporary preview
    // ========================================

    const imageURL =
        URL.createObjectURL(file);

    preview.src = imageURL;


    // ========================================
    // Display file information
    // ========================================

    console.log("Name:", file.name);

    console.log("Size:", file.size);

    console.log("Type:", file.type);

});


// ============================================
// Upload file
// ============================================

uploadButton.addEventListener(
    "click",
    async function () {

        const file =
            fileInput.files[0];


        if (!file) {

            console.log(
                "Please select a file."
            );

            return;
        }


        // Create FormData
        const formData =
            new FormData();


        // "cv" must match backend field
        formData.append(
            "cv",
            file
        );


        try {

            const response =
                await fetch(
                    "http://127.0.0.1:8000/file_demo/upload-cv/",
                    {
                        method: "POST",

                        body: formData
                    }
                );


            const data =
                await response.json();


            if (!response.ok) {

                console.log(
                    "Upload failed:",
                    data
                );

                return;
            }


            console.log(
                "Upload successful:",
                data
            );


            // Django may return:
            // /media/cvs/example.png

            if (data.cv) {

                preview.src =
                    `http://127.0.0.1:8000${data.cv}`;

            }

        } catch (error) {

            console.error(
                "Upload error:",
                error
            );

        }

    }
);
```

---

# 88. Final Concept Summary

Think about files like this:

```text
<input type="file">
        │
        ▼
   fileInput.files
        │
        ▼
     FileList
        │
        ├───────────────┐
        │               │
        ▼               ▼
   files[0]         [...files]
        │               │
        ▼               ▼
      File          File[]
        │
        ├── name
        ├── size
        ├── type
        └── lastModified
        │
        ├───────────────────────┐
        │                       │
        ▼                       ▼
createObjectURL()           FormData
        │                       │
        ▼                       ▼
Temporary preview            fetch()
                                │
                                ▼
                              Django
                                │
                                ▼
                         request.FILES
                                │
                                ▼
                         FileField/ImageField
                                │
                                ▼
                          MEDIA_ROOT
                                │
                                ▼
                        Saved server file
```

The three most important things to remember are:

```text
File
→ represents the selected file.

FormData
→ carries the file to the server.

Django media storage
→ keeps the uploaded file persistently.
```

And for previews:

```text
URL.createObjectURL(file)
→ temporary preview only.
```

For multiple files:

```text
JavaScript:
formData.append("files", file)

Django:
request.FILES.getlist("files")
```

That is the foundation you will use for **plain JavaScript, React, React Native/web file handling, and Django REST Framework file uploads**.
