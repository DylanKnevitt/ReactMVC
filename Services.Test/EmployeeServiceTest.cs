using System;
using System.Collections;
using Moq;
using Repositories;
using Services.Model;
using Xunit;
using AutoMapper;
using Repositories.Interfaces;
using System.Collections.Generic;
using System.Linq;

namespace Services.Test
{

    public abstract class BaseEmployeeServiceTest
    {
        public class EmployeeGetTestData : IEnumerable<object[]>
        {
            public readonly List<object[]> _data = new List<object[]>
            {
                new object[] { 1,""},
                new object[] { 2,"" },
                new object[] { int.MinValue,"" },
                new object[] { int.MaxValue,"" }
            };

            public IEnumerator<object[]> GetEnumerator()
            {
                return _data.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        public class EmployeeAddTestData :IEnumerable<object[]>
        {
            public new readonly List<object[]> _data = new List<object[]>
            {
                new object[] { 0,""},
                new object[] { 0,"" },
                new object[] { 0,"" }
            };

            public IEnumerator<object[]> GetEnumerator()
            {
                return _data.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        public class InvalidEmployeeAddTestData : IEnumerable<object[]>
        {
            public new readonly List<object[]> _data = new List<object[]>
            {
                new object[] { 1,""},
                new object[] { 2,"" },
                new object[] { int.MaxValue,"" }
            };

            public IEnumerator<object[]> GetEnumerator()
            {
                return _data.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        public class EmployeeUpdateTestData : IEnumerable<object[]>
        {
            public new readonly List<object[]> _data = new List<object[]>
            {
                new object[] { 1,""},
                new object[] { 2,"" },
                new object[] { int.MaxValue,"" }
            };

            public IEnumerator<object[]> GetEnumerator()
            {
                return _data.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        public class InvalidEmployeeUpdateTestData : IEnumerable<object[]>
        {
            public new readonly List<object[]> _data = new List<object[]>
            {
                new object[] { 0,""},
                new object[] { -1,"" },
                new object[] { int.MinValue,"" }
            };

            public IEnumerator<object[]> GetEnumerator()
            {
                return _data.GetEnumerator();
            }

            IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
        }

        protected abstract IEmployeeService
            GetEmployeeServiceInstance(IEmployeeRepository employeeRepository, IMapper mapper);

        private List<Employee> GetEmployees()
        {
            var employees = new List<Employee>
            {
                new Employee() { Id = 1, FirstName = "" },
                new Employee() { Id = 2, FirstName = "" },
                new Employee() { Id = int.MinValue, FirstName = "" },
                new Employee() { Id = int.MaxValue, FirstName = "" }
            };

            return employees;
        }

        [Fact]
        public void TestEmployeeService_Construct__WithNullRepo_Errors()
        {
            /// Set up
            IEmployeeRepository employeeRepository = null;
            var mapper = new Mock<IMapper>();

            Assert.Throws<NullReferenceException>(() => new EmployeeService(employeeRepository, mapper.Object));
        }

        [Fact]
        public void TestEmployeeService_Construct__WithNullMapper_Errors()
        {
            /// Set up
            var employeeRepository = new Mock<IEmployeeRepository>();
            IMapper mapper = null;

            Assert.Throws<NullReferenceException>(() => new EmployeeService(employeeRepository.Object
                , mapper));
        }

        [Fact]
        public void TestEmployeeService_Construct_DoesNotError()
        {
            /// Set up
            var employeeRepository = new Mock<IEmployeeRepository>();
            var mapper = new Mock<IMapper>();

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object,mapper.Object);

            Assert.NotNull(employeeService);
            Assert.IsAssignableFrom<IEmployeeService>(employeeService);
        }

        [Theory]
        [ClassData(typeof(EmployeeGetTestData))]
        public void TestEmployeeService_Get_ReturnsValidEmployee(int id,string firstName)
        {
            /// Set up
            var employeeDataModel = new EmployeeDataModel();
            var employee = new Employee
            {
                Id = id,
                FirstName = firstName
            };

            var mapper = new Mock<IMapper>();

            var employeeRepository = new Mock<IEmployeeRepository>();
            employeeRepository.Setup(x => x.Get(id))
                .Returns(employeeDataModel);

            mapper.Setup(x => x.Map<EmployeeDataModel, Employee>(employeeDataModel))
                .Returns(employee);

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object, mapper.Object);

            var result = employeeService.Get(id);

            Assert.NotNull(result);
            Assert.IsType<Employee>(result);
            Assert.Equal(employee,result);
        }

        [Fact]
        public void TestEmployeeService_GetAll_ReturnsValidEmployees()
        {
            /// Set up
            var employeeDataModel = new List<EmployeeDataModel>();

            var employees = GetEmployees();
            var mapper = new Mock<IMapper>();

            var page = 1;
            var pageSize = 5;

            var employeeRepository = new Mock<IEmployeeRepository>();
            employeeRepository.Setup(x => x.GetAll(page,pageSize))
                .Returns(employeeDataModel);

            mapper.Setup(x => x.Map<List<EmployeeDataModel>, List<Employee>>(employeeDataModel))
                .Returns(employees);

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object, mapper.Object);

            var result = employeeService.GetAll(page, pageSize);

            Assert.NotNull(result);
            Assert.IsType<List<Employee>>(result);
            Assert.Equal(employees, result);
        }


        [Theory]
        [ClassData(typeof(EmployeeAddTestData))]
        public void TestEmployeeService_Add_CreatesSuccessfully(int id, string firstName)
        {
            /// Set up
            var employeeDataModel = new EmployeeDataModel()
            {
                Id = id,
                FirstName = firstName
            };

            var employee = new Employee
            {
                FirstName = firstName
            };
            var mapper = new Mock<IMapper>();

            var employeeRepository = new Mock<IEmployeeRepository>();
            employeeRepository.Setup(x => x.Get(id))
                .Returns(employeeDataModel);
            employeeRepository.Setup(x => x.Add(employeeDataModel))
                .Returns(id);

            mapper.Setup(x => x.Map<EmployeeDataModel, Employee>(employeeDataModel))
                .Returns(employee);

            mapper.Setup(x => x.Map<Employee,EmployeeDataModel> (employee))
                .Returns(employeeDataModel);

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object, mapper.Object);

            Assert.True(employee.Id == 0);

            var result =  employeeService.Add(employee);

            Assert.IsType<int>(result);
            Assert.Equal(id, result);
        }


        [Theory]
        [ClassData(typeof(InvalidEmployeeAddTestData))]
        public void TestEmployeeService_Add_WithId_ThrowsError(int id, string firstName)
        {
            /// Set up
            var employeeDataModel = new EmployeeDataModel()
            {
                Id = id,
                FirstName = firstName
            };

            var employee = new Employee
            {
                Id = id,
                FirstName = firstName
            };
            var mapper = new Mock<IMapper>();

            var employeeRepository = new Mock<IEmployeeRepository>();
            employeeRepository.Setup(x => x.Get(id))
                .Returns(employeeDataModel);
            employeeRepository.Setup(x => x.Add(employeeDataModel))
                .Returns(id);

            mapper.Setup(x => x.Map<EmployeeDataModel, Employee>(employeeDataModel))
                .Returns(employee);

            mapper.Setup(x => x.Map<Employee, EmployeeDataModel>(employee))
                .Returns(employeeDataModel);

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object, mapper.Object);

            Assert.Throws<Exception>(() => employeeService.Add(employee));



        }

        [Theory]
        [ClassData(typeof(EmployeeUpdateTestData))]
        public void TestEmployeeService_Update_DoesNotError(int id, string firstName)
        {
            /// Set up
            var employeeDataModel = new EmployeeDataModel()
            {
                Id = id,
                FirstName = firstName
            };

            var employee = new Employee
            {
                Id = id,
                FirstName = firstName
            };
            var mapper = new Mock<IMapper>();

            var employeeRepository = new Mock<IEmployeeRepository>();
            employeeRepository.Setup(x => x.Add(employeeDataModel))
                .Returns(id);

            mapper.Setup(x => x.Map<EmployeeDataModel, Employee>(employeeDataModel))
                .Returns(employee);

            mapper.Setup(x => x.Map<Employee, EmployeeDataModel>(employee))
                .Returns(employeeDataModel);

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object, mapper.Object);

            var ex = Record.Exception(() => employeeService.Update(employee));

            Assert.Null(ex);

        }

        [Theory]
        [ClassData(typeof(InvalidEmployeeUpdateTestData))]
        public void TestEmployeeService_Update_IfId_Lt_Zero_ThrowError(int id, string firstName)
        {
            /// Set up
            var employeeDataModel = new EmployeeDataModel()
            {
                Id = id,
                FirstName = firstName
            };

            var employee = new Employee
            {
                Id = id,
                FirstName = firstName
            };
            var mapper = new Mock<IMapper>();

            var employeeRepository = new Mock<IEmployeeRepository>();
            employeeRepository.Setup(x => x.Add(employeeDataModel))
                .Returns(id);

            mapper.Setup(x => x.Map<EmployeeDataModel, Employee>(employeeDataModel))
                .Returns(employee);

            mapper.Setup(x => x.Map<Employee, EmployeeDataModel>(employee))
                .Returns(employeeDataModel);

            var employeeService = GetEmployeeServiceInstance(employeeRepository.Object, mapper.Object);

            Assert.Throws<Exception>(() => employeeService.Update(employee));

        }

    }




    public class EmployeeServiceTest : BaseEmployeeServiceTest
    {
        protected override IEmployeeService GetEmployeeServiceInstance(IEmployeeRepository employeeRepository, IMapper mapper)
        {
            if (employeeRepository == null)
            {
                return new EmployeeService(new Mock<IEmployeeRepository>().Object, new Mock<IMapper>().Object);
            }
            else
            {
                return new EmployeeService(employeeRepository, mapper);
            }
        }
    }
}
