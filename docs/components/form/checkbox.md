# checkbox
## Props
### proxies
|Name|Type|Description|Default|
|-|-|-|-|
|value|any|Отмечает или убирает отметку с чекбокса|—|
|disabled|any|Делает чекбкос недоступным для пользователя|—|
|error|any|Помечает чекбокс ошибочным при помощи CSS|—|

### params
|Name|Type|Description|Default|
|-|-|-|-|
|name|string|Задаёт имя чекбокса|—|
|size|'small'/'medium'/'large'<br>string|Задаёт визуальный размер чекбокса при помощи CSS|medium|
|text|string|Задаёт текст чекбокса|—|

### methods
|Name|Type|Description|Default|
|-|-|-|-|
|action|function|Приводит в действие функцию, описываемую в методе, после взаимодействия с чекбоксом|—|

## Component methods
|Name|Type|Description|Default|
|-|-|-|-|
|set|any|Внешний метод, реактивно задающий value указанному компоненту|this.proxy.value|

```js
this.node.example.method.set(true)
```
```js
this.node.example.method.set(false)
```