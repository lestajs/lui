# Buttons
Buttons enable the user to select one or more elements.

The component has 3 different types of visualization: radio, text, and button. 
Additionally, this tool can disable one, some, or all buttons as needed.


## proxies
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|value|string / array|Makes buttons text more weight|—|
|disabled|array / boolean / any|Component disabled state|false|
|error|boolean|Component error state|false|

## params
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|name|string|Component name|—|
|size|string: small / medium / large|Component visual size|small|
|text|string|Component headline|—|
|type|string: button / text / radio|Component buttons type|button|
|buttons|array|Array of buttons value|—|

## methods
|Name|Description|Parameters|
|:-|:-|:-|
|action|Catches component action| (name, value, index, values)

# Action parameters
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|name|string|Component name|—|
|value|string|Button value|—|
|index|int|Button index|—|
|values|array|Component values|—|


>If the component value is an **<u>string</u>**, the component switches to **<u>single</u>** mode, so the component name and option value are passed as parameters to the action method.

>If the component value is an **<u>array</u>**, the component switches to **<u>multiple</u>** mode, so an array is also passed as an additional parameter to the action method.


## External methods
### set
Dynamically sets a new value for a component. The method is available as a property of the node object.

```js
/*
    @proxy { boolean } component value
*/
    this.node.('node name').method.set('button value')
```

### isDisabled()

|Type|Description|Example|Result|
|:-|:-|:-|:-|
|array|Makes the buttons contains in array disabled|disabled: ['A', 'C']|Buttons "А" and "С" are will be disabled|
|boolean|Makes all component buttons disabled|disabled: true|All component buttons are will be disabled|
|any|Makes one definite button disabled|disabled: 'A'|Button "A" is will be disabled|