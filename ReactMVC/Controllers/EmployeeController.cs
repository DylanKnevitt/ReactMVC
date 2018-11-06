using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using ReactMVC.ViewModel;
using Services;
using Services.Model;

namespace ReactMVC.Controllers
{
    [Route("api/v1/")]
    public class EmployeeController : Controller
    {
        private IEmployeeService EmployeeService { get; }
        private IMapper Mapper { get; }
        public EmployeeController(IEmployeeService employeeService,IMapper mapper)
        {
            EmployeeService = employeeService ?? throw new NullReferenceException("Employee service paramter is null");
            Mapper = mapper ?? throw new NullReferenceException("Mapper paramter is null");
        }

        [HttpGet("Employees/{id:int}")]
        public ActionResult GetEmployee(int id)
        {
            var employee = EmployeeService.Get(id);
            var mappedResult = Mapper.Map<Employee, EmployeeViewModel>(employee);
            if (mappedResult == null)
            {
                return NotFound();
            }
            return Ok(mappedResult);
        }

        [HttpGet("Employees")]
        public ActionResult GetEmployees(int pageIndex)
        {
            var employees = EmployeeService.GetAll(pageIndex);
            var mappedResult = Mapper.Map<IEnumerable<Employee>, IEnumerable<EmployeeViewModel>>(employees);
            return Ok(mappedResult);
        }

        [HttpPost("Employees")]
        public ActionResult GetEmployees([FromBody] EmployeeViewModel employee)
        {
            var mappedResult = Mapper.Map<EmployeeViewModel, Employee> (employee);
            EmployeeService.Update(mappedResult);
            return Ok();
        }
    }
}
