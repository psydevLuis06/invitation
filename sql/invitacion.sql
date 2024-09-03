CREATE TABLE Usuario (
  Id_Usuario INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(100),
  App VARCHAR(100),
  Apm VARCHAR(100),
  UserName VARCHAR(255),
  PassWd VARCHAR(255),
  Estatus BOOLEAN
);

CREATE TABLE Evento (
  Id_Evento INT PRIMARY KEY AUTO_INCREMENT,
  Estatus BOOLEAN,
  TotalInvitados INT,
  Fecha DATETIME,
  Ubicación VARCHAR(255),
  Novia VARCHAR(255),
  Novio VARCHAR(255)
);

CREATE TABLE Familia (
  Id_Familia INT PRIMARY KEY AUTO_INCREMENT,
  QR VARCHAR(255),
  Cantidad INT,
  Nombre VARCHAR(255),
  Confirmado BOOLEAN,
  Id_Evento INT,
  Codigo VARCHAR(10),
  FOREIGN KEY (Id_Evento) REFERENCES Evento(Id_Evento)
);

CREATE TABLE MesaRegalo (
  Id_Mesa INT PRIMARY KEY AUTO_INCREMENT,
  Nombre VARCHAR(255)
);

CREATE TABLE Det_Evento (
  Id_Evento INT,
  CNS INT AUTO_INCREMENT,
  URL TEXT,
  PRIMARY KEY(CNS,Id_Evento),
  FOREIGN KEY (Id_Evento) REFERENCES Evento(Id_Evento)
);



CREATE TABLE Det_Familia (
  CNS INT AUTO_INCREMENT,
  Id_Familia INT,
  Id_Mesa INT,
  NumSilla INT,
  NumMesa INT,
  NombreInvitado VARCHAR(255),
  NumTelefono DOUBLE,
  ConfirmarAsistencia BOOLEAN,
  Comentarios TEXT,
  LlamarConfirmacion BOOLEAN,
  QR VARCHAR(255),
  Codigo VARCHAR(10),
  PRIMARY KEY(CNS, Id_Familia),
  FOREIGN KEY (Id_Familia) REFERENCES Familia(Id_Familia)
  );
  
 --DROP TABLE familia
 
 
 SELECT 
 * FROM EVENTO E ;
 
INSERT INTO USUARIO (NOMBRE, APP,APM, USERNAME, PASSWD,ESTATUS) values('Luis','De Leon', 'Arellano','psyLuis06', 'bfb3c0160f2302a4c632aa6ebfc70865', TRUE);


INSERT INTO EVENTO (ESTATUS, TOTALINVITADOS, FECHA, UBICACIÓN, NOVIA, NOVIO) VALUES(1, 100, '2024-11-09 18:00:00.000', 'Salón El Pedregal', 'Alexia Ozuna', 'Luis de León');
