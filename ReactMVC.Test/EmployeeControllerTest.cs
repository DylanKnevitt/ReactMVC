using System;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Moq;
using ReactMVC.Controllers;
using ReactMVC.ViewModel;
using Repositories.Interfaces;
using Services;
using Services.Model;
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

        [Fact]
        public void TestEmployeeController_GetEmployee_ReturnsOk_ResponseWithObject()
        {
            var employeeService = new Mock<IEmployeeService>();
            var mapper = new Mock<IMapper>();
            var id = 1;
            var model = new Employee();
            var viewModel = new EmployeeViewModel
            {
                Id = id
                ,FirstName = "Test"
            };

            employeeService.Setup(x => x.Get(id))
                .Returns(model);

            mapper.Setup(x => x.Map<Employee, EmployeeViewModel>(model))
                .Returns(viewModel);

            var controller = GetControllerInstance(employeeService.Object, mapper.Object);

            var actionResult = controller.GetEmployee(id);

             actionResult.ExecuteResult(controller.ControllerContext);

            Assert.IsType<OkObjectResult>(actionResult);
            var result = (OkObjectResult) actionResult;
            Assert.Equal(viewModel,result.Value);

        }

        [Fact]
        public void TestEmployeeController_GetEmployee_WhenNotExists_Returns404()
        {
            var employeeService = new Mock<IEmployeeService>();
            var mapper = new Mock<IMapper>();
            var id = 1;
            Employee model = null;
            EmployeeViewModel viewModel = null;
                

            employeeService.Setup(x => x.Get(id))
                .Returns(model);

            mapper.Setup(x => x.Map<Employee, EmployeeViewModel>(model))
                .Returns(viewModel);

            var controller = GetControllerInstance(employeeService.Object, mapper.Object);

            var actionResult = controller.GetEmployee(id);

            Assert.IsType<NotFoundResult>(actionResult);
        }

        private EmployeeController GetControllerInstance(IEmployeeService employeeService,IMapper mapper)
        {
            var controller = new EmployeeController(employeeService,mapper);
            return controller;
        }
    }
}
