# Tags
Tags enable the user to open a dialog window that contains a tool for searching buttons.

The search input and navigation menu can help make the process faster.

This component supports single and multiple modes, allowing the user to select one or more buttons. The selected buttons will be displayed in the result of the dialog window and in the main field.

## Proxies
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|value|array|Array of selected buttons in main field|—|
|disabled|boolean|Component disabled state|false|
|error|boolean|Component error state|false|
|opened|boolean|Component content open state|false|
|spinner|boolean|Visual loading state|false|
|selected|array|Array of selected buttons|—|

## params
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|name|string|Component name|—|
|size|string: small / medium / large|Component visual size|small|
|text|string|Component text near main field|—|
|heading|string|Component heading in dialog window|—|
|description|string|Component description in dialog window|—|
|multiple|boolean|Multiple mode state|false|
|list|array|Array of buttons in dialog window|—|
|maxlength|int|Max length of selected buttons in main field|—|

## methods
|Name|Description|Parameters|
|:-|:-|:-|
|action|Catches component action| (name, value)

# Action parameters
|Name|Type|Description|Default|
|:-|:-|:-|:-|
|name|string|Component name|—|
|value|string|Array of selected buttons value|—|