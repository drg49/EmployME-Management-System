using System.Collections.Generic;

namespace Web.Models.ApplicationModels
{
    public class JobAppRequest
    {
        public string JobTitle { get; set; }
        public string JobLocation { get; set; }
        public string DefaultQuestions { get; set; }
        public List<CustomJobAppQuestion> CustomJobAppQuestions { get; set; }
    }
}
