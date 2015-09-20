# chinesegen
Lorem Ipsum generator for Chinese
It can generate words randomly including punctuation marks in Chinese
## Usages
* sources for testing your word process libs or apps
* sources for testing your visualized pages or apps  

# Installation
```shell
npm install chinesegen
```

# API Usage Guidelines
- require Chinese generator
```javascript
  var chinesegen = require('chinesegen');
```

- get the output object by calling the generator
```javascript
  var generated = chinesegen({count: 50});
```

- access generated text and infos
```javascript
  console.log(generated.text);
  console.log(generated.sentenceCount);
```

# Input options
  - **<u>count</u>**: { _Number_ } the total word count of the generated paragraph
  - **<u>freq</u>**: { _Boolean_ } apply frequently used words
  
# Output object
  - **<u>text</u>**: { _String_ } random text
  - **<u>total</u>**: { _Number_ } text total length
  - **<u>sentenceCount</u>**: { _Number_ } sentence count

# License
  MIT License
