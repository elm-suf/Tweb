-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Lug 26, 2020 alle 14:44
-- Versione del server: 10.4.13-MariaDB
-- Versione PHP: 7.4.8

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ripetizioni`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `amministratore`
--

CREATE TABLE `amministratore` (
  `id` int(11) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `nome` varchar(35) NOT NULL,
  `cognome` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `amministratore`
--

INSERT INTO `amministratore` (`id`, `username`, `password`, `nome`, `cognome`) VALUES
(1, 'admin', 'admin', 'admin', 'admin');

-- --------------------------------------------------------

--
-- Struttura della tabella `corso`
--

CREATE TABLE `corso` (
  `id` int(11) NOT NULL,
  `titolo` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `corso`
--

INSERT INTO `corso` (`id`, `titolo`) VALUES
(5, 'informazione'),
(2, 'italiano'),
(7, 'ium'),
(1, 'matematica'),
(9, 'prog'),
(4, 'scienza'),
(6, 'scienze cognitive'),
(3, 'storia'),
(8, 'tweb');

-- --------------------------------------------------------

--
-- Struttura della tabella `docente`
--

CREATE TABLE `docente` (
  `id` int(11) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `nome` varchar(35) NOT NULL,
  `cognome` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `docente`
--

INSERT INTO `docente` (`id`, `username`, `password`, `nome`, `cognome`) VALUES
(1, 'mariolindo', 'lapassword', 'mario', 'lindo'),
(2, 'gesualdo', 'pizzabianca', 'gesu', 'alto'),
(3, 'ippolito', 'menesbatto', 'ippo', 'meneghetto');

-- --------------------------------------------------------

--
-- Struttura della tabella `insegnamento`
--

CREATE TABLE `insegnamento` (
  `id` int(11) NOT NULL,
  `corso` varchar(35) NOT NULL,
  `docente` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `insegnamento`
--

INSERT INTO `insegnamento` (`id`, `corso`, `docente`) VALUES
(12, 'informazione', 'ippolito'),
(9, 'italiano', 'ippolito'),
(6, 'ium', 'gesualdo'),
(2, 'ium', 'mariolindo'),
(8, 'matematica', 'gesualdo'),
(4, 'matematica', 'mariolindo'),
(5, 'prog', 'gesualdo'),
(1, 'prog', 'mariolindo'),
(11, 'scienza', 'ippolito'),
(10, 'storia', 'ippolito'),
(7, 'tweb', 'gesualdo'),
(3, 'tweb', 'mariolindo');

-- --------------------------------------------------------

--
-- Struttura della tabella `prenotazione`
--

CREATE TABLE `prenotazione` (
  `id` int(11) NOT NULL,
  `stato` set('attiva','effettuata','disdetta') DEFAULT NULL,
  `studente` varchar(35) DEFAULT NULL,
  `docente` varchar(35) DEFAULT NULL,
  `id_insegnamento` int(11) DEFAULT NULL,
  `slot` set('1','2','3','4') NOT NULL,
  `data` date NOT NULL,
  `corso` varchar(35) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `prenotazione`
--

INSERT INTO `prenotazione` (`id`, `stato`, `studente`, `docente`, `id_insegnamento`, `slot`, `data`, `corso`) VALUES
(1, 'disdetta', NULL, 'ippolito', 12, '2', '2020-07-17', 'informazione'),
(2, 'attiva', NULL, 'ippolito', 12, '1', '2020-07-17', 'informazione');

-- --------------------------------------------------------

--
-- Struttura della tabella `studente`
--

CREATE TABLE `studente` (
  `id` int(11) NOT NULL,
  `username` varchar(35) NOT NULL,
  `password` varchar(35) NOT NULL,
  `nome` varchar(35) NOT NULL,
  `cognome` varchar(35) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `studente`
--

INSERT INTO `studente` (`id`, `username`, `password`, `nome`, `cognome`) VALUES
(1, 'gintonik', 'qwertyuiop', 'gian maria', 'franzino'),
(2, 'salonicco', 'weicosaguardiii', 'salvatore', 'arrangiato');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `amministratore`
--
ALTER TABLE `amministratore`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `amministratore_username_uindex` (`username`);

--
-- Indici per le tabelle `corso`
--
ALTER TABLE `corso`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `corso_titolo_uindex` (`titolo`);

--
-- Indici per le tabelle `docente`
--
ALTER TABLE `docente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `teacher_username_uindex` (`username`);

--
-- Indici per le tabelle `insegnamento`
--
ALTER TABLE `insegnamento`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `insegnamento_corso_docente_pk` (`corso`,`docente`),
  ADD KEY `insegnamento_corso_titolo_fk` (`corso`),
  ADD KEY `insegnamento_docente_username_fk` (`docente`);

--
-- Indici per le tabelle `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `prenotazione_id_insegnamento_n_slot_stato_data_pk` (`docente`,`slot`,`stato`,`data`),
  ADD KEY `prenotazione_insegnamento_id_fk` (`id_insegnamento`),
  ADD KEY `prenotazione_studente_fk` (`studente`);

--
-- Indici per le tabelle `studente`
--
ALTER TABLE `studente`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `amministratore`
--
ALTER TABLE `amministratore`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT per la tabella `corso`
--
ALTER TABLE `corso`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT per la tabella `docente`
--
ALTER TABLE `docente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT per la tabella `insegnamento`
--
ALTER TABLE `insegnamento`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT per la tabella `studente`
--
ALTER TABLE `studente`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `insegnamento`
--
ALTER TABLE `insegnamento`
  ADD CONSTRAINT `insegnamento_corso_titolo_fk` FOREIGN KEY (`corso`) REFERENCES `corso` (`titolo`),
  ADD CONSTRAINT `insegnamento_docente_username_fk` FOREIGN KEY (`docente`) REFERENCES `docente` (`username`);

--
-- Limiti per la tabella `prenotazione`
--
ALTER TABLE `prenotazione`
  ADD CONSTRAINT `prenotazione_docente_fk` FOREIGN KEY (`docente`) REFERENCES `docente` (`username`),
  ADD CONSTRAINT `prenotazione_insegnamento_id_fk` FOREIGN KEY (`id_insegnamento`) REFERENCES `insegnamento` (`id`),
  ADD CONSTRAINT `prenotazione_studente_fk` FOREIGN KEY (`studente`) REFERENCES `studente` (`username`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
