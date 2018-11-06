using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Text;

namespace Repositories.Interfaces
{
    public interface IEmployeeRepository : IRepository
    {
        EmployeeDataModel Get(int id);
        IEnumerable<EmployeeDataModel> GetAll(int page, int pageSize);
        int Add(EmployeeDataModel dataModel);
        void Update(EmployeeDataModel dataModel);
    }
}
