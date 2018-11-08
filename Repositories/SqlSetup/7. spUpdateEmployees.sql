USE [TestCompanyDb]
GO

IF EXISTS (SELECT TOP 1 1 FROM sys.procedures WHERE name = 'spUpdateEmployees')
BEGIN
DROP PROCEDURE spUpdateEmployees
END
GO

CREATE PROCEDURE [dbo].[spUpdateEmployees](
    @Id [int],
	@FirstName [nvarchar](255),
	@LastName [nvarchar](255),
	@ComplexDetails [nvarchar](255),
	@StreetName [nvarchar](255),
	@Suburb [nvarchar](255),
	@Province [nvarchar](255),
	@Country [nvarchar](255),
	@PostalCode [nvarchar](20),
	@ContactCountryCode [nvarchar](3),
	@ContactNumber [nvarchar](14),
	@ContactExtension [nvarchar](4),
	@EmailAddress [nvarchar](100),
	@TwitterHandle [nvarchar](100),
	@GithubPage [nvarchar](100)
)
AS
BEGIN

UPDATE EMP
SET
FirstName=@FirstName,
LastName=@LastName,
ComplexDetails=@ComplexDetails,
StreetName=@StreetName,
Suburb=@Suburb,
Province=@Province,
Country=@Country,
PostalCode=@PostalCode,
ContactCountryCode=@ContactCountryCode,
ContactNumber=@ContactNumber,
ContactExtension=@ContactExtension,
EmailAddress=@EmailAddress,
TwitterHandle=@TwitterHandle,
GithubPage=@GithubPage,
UpdatedOn = SYSDATETIME()
FROM Employee EMP
WHERE EMP.Id = @Id

END
GO


