using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Web.Models.ApplicationModels
{
    public class JobApplication
    {
        public string JobTitle { get; set; }
        public ICollection<ApplicationQuestion> ApplicationQuestions { get; set; }
    }
}
