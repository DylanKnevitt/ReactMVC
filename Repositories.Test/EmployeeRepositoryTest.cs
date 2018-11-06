using System;
using System.Data;
using System.Data.SqlClient;
using Moq;
using Repositories.Interfaces;
using Xunit;

namespace Repositories.Test
{
    /// <summary>
    /// An abstract test for tests that apply to all classes that implement the interface
    /// </summary>
    public abstract class BaseEmployeeRepositoryTest
    {
        [Fact]
        public void TestEmployeeRepository_Construct_DoesNotError()
        {
            var employeeRepository = CreateEmployeeRepository();

            Assert.NotNull(employeeRepository);
            Assert.IsAssignableFrom<IEmployeeRepository>(employeeRepository);
        }

        protected abstract IEmployeeRepository CreateEmployeeRepository();
    }

    /// <summary>
    /// The sql implementation of IEmployeeRepository
    /// </summary>
    public class SqlEmployeeRepositoryTest : BaseEmployeeRepositoryTest
    {
        protected override IEmployeeRepository CreateEmployeeRepository()
        {
            return new SqlEmployeeRepository(new Mock<IDbConnection>().Object);
        }

        private object CreateEmployeeRepositoryWithNoConnection()
        {
            return new SqlEmployeeRepository(null);
        }

        [Fact]
        public void TestSqlEmployeeRepository_Construct_WithoutDbConnection_ThrowsError()
        {
            Assert.Throws<NullReferenceException>(() => CreateEmployeeRepositoryWithNoConnection());
        }


    }

}
