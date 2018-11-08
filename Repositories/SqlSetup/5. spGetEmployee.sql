USE [TestCompanyDb]
GO


IF EXISTS (SELECT TOP 1 1 FROM sys.procedures WHERE name = 'spGetEmployee')
BEGIN
DROP PROCEDURE spGetEmployee
END
GO

CREATE PROCEDURE [dbo].[spGetEmployee](
@Id INT
)
AS
BEGIN

SELECT
Id,
FirstName,
LastName,
ComplexDetails,
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
GithubPage
FROM Employee
WHERE Id = @Id


END
GO


