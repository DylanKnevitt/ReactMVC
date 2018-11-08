USE [TestCompanyDb]

IF EXISTS (SELECT TOP 1 1 FROM sys.procedures WHERE name = 'spGetEmployees')
BEGIN
DROP PROCEDURE spGetEmployees
END
GO

CREATE PROCEDURE spGetEmployees(
@PageIndex INT,
@PageSize INT
)
AS
BEGIN

DECLARE @Offset INT = (@PageIndex -1) * @PageSize

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
ORDER BY Id
OFFSET @Offset ROWS FETCH NEXT @PageSize ROWS ONLY;

END