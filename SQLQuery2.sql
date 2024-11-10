DROP TABLE IF EXISTS HomeWorK

CREATE TABLE HomeWork(

ID INT IDENTITY(1,1) PRIMARY KEY,
Information nvarchar(300),
Entrada  nvarchar(300),
Eliminar  nvarchar(300)

)

INSERT INTO HomeWork(Information, Entrada, Eliminar)
VALUES ('Values', '08:30:00', '17:00:00');
