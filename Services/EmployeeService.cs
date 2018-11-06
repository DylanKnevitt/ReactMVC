using System;
using System.Collections.Generic;
using System.Linq;
using AutoMapper;
using Repositories;
using Repositories.Interfaces;
using Services.Model;

namespace Services
{
    public interface IEmployeeService : IService
    {
        Employee Get(int id);
        IEnumerable<Employee> GetAll(int page, int pageSize = 5);
        int Add(Employee employee);
        void Update(Employee employee);
    }
    public class EmployeeService : IEmployeeService
    {
        private readonly IEmployeeRepository _employeeRepository;
        private readonly IMapper _mapper;
        public EmployeeService(IEmployeeRepository employeeRepository,IMapper mapper)
        {
            _employeeRepository = employeeRepository ?? throw new NullReferenceException("Employee repository parameter is null");
            _mapper = mapper ?? throw new NullReferenceException("Mapper parameter is null");
        }

        public Employee Get(int id)
        {
            var dataModel = _employeeRepository.Get(id);
            var result = _mapper.Map<EmployeeDataModel, Employee>(dataModel);
            return result;
        }

        public IEnumerable<Employee> GetAll(int page,int pageSize = 5)
        {
            var dataModel = _employeeRepository.GetAll(page,pageSize);
            var result = _mapper.Map<List<EmployeeDataModel>, List<Employee>>(dataModel.ToList());
            return result;
        }

        public int Add(Employee employee)
        {
            if (employee.Id != 0)
            {
                throw new Exception("Invalid employee id for this operation");
            }
            var dataModel = _mapper.Map<Employee, EmployeeDataModel>(employee);
            var result = _employeeRepository.Add(dataModel);
            return result;
        }

        public void Update(Employee employee)
        {
            if (employee.Id <= 0)
            {
                throw new Exception("Invalid employee id for this operation");
            }
            var dataModel = _mapper.Map<Employee, EmployeeDataModel>(employee);
            _employeeRepository.Update(dataModel);
        }
    }
}
