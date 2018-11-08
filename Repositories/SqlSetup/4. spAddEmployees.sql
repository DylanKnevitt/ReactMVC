USE [TestCompanyDb]
GO

IF EXISTS (SELECT TOP 1 1 FROM sys.procedures WHERE name = 'spAddEmployees')
BEGIN
DROP PROCEDURE spAddEmployees
END
GO

CREATE PROCEDURE [dbo].[spAddEmployees](
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

INSERT INTO Employee(
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
GithubPage,        
UpdatedOn         
)
VALUES(
@FirstName,
@LastName,
@ComplexDetails,
@StreetName,
@Suburb,
@Province,
@Country,
@PostalCode,
@ContactCountryCode,
@ContactNumber,
@ContactExtension,
@EmailAddress,
@TwitterHandle,
@GithubPage,
SYSDATETIME()
)

SELECT SCOPE_IDENTITY()

END
GO


