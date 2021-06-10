import { initializeBlock, useRecords } from '@airtable/blocks/ui';
import { useBase, useCursor, useLoadable } from '@airtable/blocks/ui';
import React from 'react';

const HelloWorldTypescriptApp = () => {
  const base = useBase();
  const cursor = useCursor();
  useLoadable(cursor);

  const table = base.getTableById(cursor.activeTableId);
  const records = useRecords(table);

  const fields = table.fields;

  return records.map((record) => {
    return fields.map((field) => {
      let images;
      if (field.type === 'multipleAttachments') {
        images = record.getCellValue(field.id);
      }

      return (
        <div key={field.id}>
          <p>{field.name}</p>
          {field.type === 'multipleAttachments'
            ? images?.map((image) => {
                const clientUrl = record.getAttachmentClientUrlFromCellValueUrl(
                  image.id,
                  image.url
                );
                return <img key={image.id} src={clientUrl} width={50} />;
              })
            : record.getCellValueAsString(field.id)}
        </div>
      );
    });
  });
};

initializeBlock(() => <HelloWorldTypescriptApp />);
