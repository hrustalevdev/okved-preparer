# okved-preparer

## Описание

Данная утилита предназначена для преобразования, скачанного с
сайта [Росстата](https://rosstat.gov.ru/opendata/7708234640-okved2), `.csv` файла, содержащего "Общероссийский
классификатор видов экономической деятельности (ОКВЭД2)", в формат `.json`.  
По умолчанию на выходе получается 2 фала `okved2Flat.json` и `okved2Tree.json`, содержащие соответственно плоскую и
иерархическую структуру классификатора.

```typescript
const jsonOkvedCreator = new JsonOkvedCreator(new Options());
jsonOkvedCreator.create();
```

Кроме того, если, при формировании опций, первым параметром (`level`) добавить, например, `EOkvedType.Class`, то будет
сформирован дополнительный файл `okved2TreeFromClass.json`, содержащий иерархическую структуру классификатора, начиная с
указанного уровня.

```typescript
const jsonOkvedCreator = new JsonOkvedCreator(new Options(EOkvedType.Class));
jsonOkvedCreator.create();
```

Последние преобразованные фалы находятся в папке `IO`.  
Пример **плоской** структуры:

```json
[
  {
    "id": "A",
    "parentId": "",
    "type": "section",
    "section": "A",
    "code": "",
    "name": "СЕЛЬСКОЕ, ЛЕСНОЕ ХОЗЯЙСТВО, ОХОТА, РЫБОЛОВСТВО И РЫБОВОДСТВО"
  },
  {
    "id": "A.01",
    "parentId": "A",
    "type": "class",
    "section": "A",
    "code": "01",
    "name": "Растениеводство и животноводство, охота и предоставление соответствующих услуг в этих областях"
  },
  {
    "id": "A.01.1",
    "parentId": "A.01",
    "type": "subClass",
    "section": "A",
    "code": "01.1",
    "name": "Выращивание однолетних культур"
  }
]

```

Пример **иерархической** структуры:

```json
[
  {
    "id": "A",
    "parentId": "",
    "type": "section",
    "section": "A",
    "code": "",
    "name": "СЕЛЬСКОЕ, ЛЕСНОЕ ХОЗЯЙСТВО, ОХОТА, РЫБОЛОВСТВО И РЫБОВОДСТВО",
    "items": [
      {
        "id": "A.01",
        "parentId": "A",
        "type": "class",
        "section": "A",
        "code": "01",
        "name": "Растениеводство и животноводство, охота и предоставление соответствующих услуг в этих областях",
        "items": [
          {
            "id": "A.01.1",
            "parentId": "A.01",
            "type": "subClass",
            "section": "A",
            "code": "01.1",
            "name": "Выращивание однолетних культур",
            "items": []
          }
        ]
      }
    ]
  }
]
```

## Установка

```shell
npm i
```

## Использование

Скачать файл с сайта [Росстата](https://rosstat.gov.ru/opendata/7708234640-okved2) и поместить его в папку `IO`.
Выполнить команду:

```shell
npm run start
```

В итоге в папке `IO` появятся 2 файла `okved2Flat.json` и `okved2Tree.json`.
