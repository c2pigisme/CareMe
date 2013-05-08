var loadDB = function() {
	function populateDB(tx) {
		tx.executeSql('DROP TABLE IF EXISTS medtbl');
		tx.executeSql('CREATE TABLE IF NOT EXISTS medtbl (id unique, name)');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (1, "First row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (2, "Second row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (3, "Third row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (4, "Fourth row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (5, "Firth row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (6, "Sixth row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (7, "Seventh row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (8, "Eight row")');
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (9, "Ninth row")');	
		tx.executeSql('INSERT INTO medtbl (id, name) VALUES (10, "Tenth row")');
	}

	function errorCB(err) {
	    console.log("Error processing SQL: ");
	    console.log(err);
	}
	var db = window.openDatabase("meddb", "1.0", "Med Database", 200000);
	db.transaction(populateDB, errorCB, function() {
		console.log('finish db loading');
	});
};