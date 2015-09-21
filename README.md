# chinesegen
[![npm version](https://badge.fury.io/js/chinesegen.svg)](http://badge.fury.io/js/chinesegen)

Lorem Ipsum generator for Chinese
It can generate words randomly including punctuation marks in Chinese

中文随机文本生成器

## Usages
* sources for testing your word process libs or apps
* sources for testing your visualized pages or apps

可以用来测试你的中文文字处理库或者程序，也可以用来测试你的可视化页面。

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

  篇幅字数总长

  - **<u>freq</u>**: { _Boolean_ } apply frequently used words
  - **<u>toleratedPeriods</u>**: { _String_ } given characters(each represents one period) will be treated as unique periods appended to Chinese periods list
  ```javascript
    // treat both Chinese formal periods and '?.!' as full stops of the Chinese sentences
    generate({count: 50, toleratedPeriods:'?.!'});
  ```

# Output object
  - **<u>text</u>**: { _String_ } random text
  - **<u>total</u>**: { _Number_ } text total length
  - **<u>sentenceCount</u>**: { _Number_ } sentence count

# License
  MIT License
