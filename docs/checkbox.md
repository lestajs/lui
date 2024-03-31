# Checkbox
Checkboxes enable the user to turn them on or off, and also to select one or more elements.

## proxies
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|value|boolean|Component checked value|false|
|disabled|boolean|Component disabled state|false|
|error|boolean|Component error state|false|

## params
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|name|string|Component name|—|
|size|string: small / medium / large|Component visual size|medium|
|text|string|Component text|—|

## methods
|Name|Description|Parameters|
|:-|:-|:-|
|action|Catches component action| (name, value)

# Action parameters
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|name|string|Ckeckbox name|—|
|value|boolean|Ckeckbox value|—|

## External methods
### set
Dynamically sets a new value for a component. The method is available as a property of the node object.

```js
/*
    @proxy { boolean } component value
*/
    this.node.('node name').method.set(true)
```