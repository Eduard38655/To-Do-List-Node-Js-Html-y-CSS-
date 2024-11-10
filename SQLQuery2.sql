DROP TABLE IF EXISTS HomeWorK

CREATE TABLE HomeWork(

ID INT IDENTITY(1,1) PRIMARY KEY,
Information nvarchar(300),
Entrada  nvarchar(300),
Eliminar  nvarchar(300)

)

INSERT INTO HomeWork(Information, Entrada, Eliminar)
VALUES ('x', '08:30:00', '17:00:00');



DELETE  FROM HomeWork WHERE ID>1
UPDATE HomeWork SET Eliminar = 'N/A' WHERE Eliminar IS NULL
SELECT * FROM HomeWork