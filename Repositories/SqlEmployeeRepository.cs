using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using Dapper;
using Repositories.Interfaces;

namespace Repositories
{
 

    public class SqlEmployeeRepository : IEmployeeRepository
    {
        private readonly IDbConnection _dbConnection;

        public SqlEmployeeRepository(IDbConnection dbConnection)
        {
            _dbConnection = dbConnection ?? throw new NullReferenceException("No IDbConnection parameter was passed");
        }

        public EmployeeDataModel Get(int id)
        {
            var query = "spGetEmployee @id";
            var result = _dbConnection.Query<EmployeeDataModel>(query, new{id});
            return result.FirstOrDefault();
        }

        public IEnumerable<EmployeeDataModel> GetAll(int page,int pageSize)
        {
            var query = "spGetEmployees @page,@pageSize";
            var result = _dbConnection.Query<EmployeeDataModel>(query, new { page, pageSize });
            return result;
        }

        public int Add(EmployeeDataModel dataModel)
        {
            var query = @"";

            var result = _dbConnection.Query<int>(query);
            return result.FirstOrDefault();
        }

        public void Update(EmployeeDataModel dataModel)
        {
            var query = @"spUpdateEmployees 
            @Id,
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
            @GithubPage";
            _dbConnection.Execute(query,dataModel);
        }

        public void Dispose()
        {
            _dbConnection.Dispose();
            GC.SuppressFinalize(this);
        }
    }
}
