# Buttons

## Props

### proxies
|Name|Type|Description|Default|
|-|-|-|-|
|value|string или object (array)|Выделяет указанные кнопки|—|
|disabled|boolean|Состояние компонента доступен / недоступен|false|
|error|boolean|Состояние ошибки у компонента|false|

### params
|Name|Type|Description|Default|
|-|-|-|-|
|name|string|Имя компонента|—|
|size|string: small/medium/large|Визуальный размер компонента|small|
|text|string|Заголовок компонента|—|
|type|string: string/radio|Тип кнопок компонента|string|
|options|object (array)|Массив кнопок|—|

### methods
|Name|Description|Parameters|
|-|-|-|
|action|Ловит действие компонента| (имя компонента, значение опции)


>Если value компонента является массивом, в качестве параметров передаются имя компонента, значение опции, индекс в компоненте и индекс в динамическом массиве.


## External methods
### set
Динамически устанавливает новое значение для value компонента. Метод доступен, как свойство объекта узла.

```js
/*
    @proxy { boolean } value компонента
*/
    this.node.('имя узла').method.set('value')
```