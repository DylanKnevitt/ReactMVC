using System;
using AutoMapper;
using Moq;
using ReactMVC.Controllers;
using Repositories.Interfaces;
using Services;
using Xunit;

namespace ReactMVC.Test
{
    public class EmployeeControllerTest
    {
        [Fact]
        public void TestEmployeeController_Construct_Succeeds()
        {
            var employeeService = new Mock<IEmployeeService>();
            var mapper = new Mock<IMapper>();
            var controller = GetControllerInstance(employeeService.Object,mapper.Object);

            Assert.IsType<EmployeeController>(controller);
            Assert.NotNull(controller);
        }

        [Fact]
        public void TestEmployeeController_Construct_WithNullEmployeeService_ThrowsError()
        {
            IEmployeeService employeeService = null;
            var mapper = new Mock<IMapper>();

            Assert.Throws<NullReferenceException>(() => GetControllerInstance(employeeService, mapper.Object));
        }

        [Fact]
        public void TestEmployeeController_Construct_WithNullMapper_ThrowsError()
        {
            var employeeService = new Mock<IEmployeeService>();
            IMapper mapper = null;

            Assert.Throws<NullReferenceException>(() => GetControllerInstance(employeeService.Object, mapper));
        }

        private EmployeeController GetControllerInstance(IEmployeeService employeeService,IMapper mapper)
        {
            var controller = new EmployeeController(employeeService,mapper);
            return controller;
        }
    }
}
