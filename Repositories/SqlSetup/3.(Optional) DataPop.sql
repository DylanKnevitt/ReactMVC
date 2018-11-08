USE [TestCompanyDb]
GO

DECLARE @RowCount INT
DECLARE @RowString VARCHAR(10)
DECLARE @Random INT
DECLARE @Upper INT
DECLARE @Lower INT
DECLARE @InsertDate DATETIME
SET @Lower = -730
SET @Upper = -1
SET @RowCount = 0

WHILE @RowCount < 50
BEGIN

SET @RowString = CAST(@RowCount AS VARCHAR(10))

	SELECT @Random = ROUND(((@Upper - @Lower -1) * RAND() + @Lower), 0)

	SET @InsertDate = DATEADD(dd, @Random, GETDATE())

    INSERT INTO Employee
		(FirstName
		,LastName
		,ComplexDetails,
	    StreetName,
        Suburb,
        Province,
        Country,
        PostalCode,
        ContactCountryCode,
        ContactNumber,
        ContactExtension,
        EmailAddress,
        TwitterHandle,
        GithubPage)
	VALUES
		(REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        REPLICATE('0', 10 - DATALENGTH(@RowString)) + @RowString,
        2196,
        031,
        2038,
        NULL,
        'dylan.knevitt@gmail.com',
        '@huggsboson',
        'https://github.com/dylanknevitt')

	SET @RowCount = @RowCount + 1
END
