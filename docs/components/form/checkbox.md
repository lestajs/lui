# Checkbox

## Props

### proxies
|Name|Type|Description|Default|
|-|-|-|-|
|value|boolean|Значение checked у компонента|false|
|disabled|boolean|Состояние компонента доступен / недоступен|false|
|error|boolean|Состояние ошибки у компонента|false|

### params
|Name|Type|Description|Default|
|-|-|-|-|
|name|string|Имя компонента|—|
|size|string: small/medium/large|Визуальный размер компонента|medium|
|text|string|Надпись у компонента|—|

### methods
|Name|Description|Parameters|
|-|-|-|
|action|Ловит действие компонента| (имя компонента, значение компонента)


## External methods
### set
Устанавливает новое значение для "value" в компоненте компонента. Метод доступен, как свойство объекта узла

```js
/**
 * @param { boolean } значение для прокси в компоненте.
 */
this.node['имя узла'].method.set(true)
```