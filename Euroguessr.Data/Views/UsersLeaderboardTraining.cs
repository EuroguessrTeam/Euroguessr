using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Euroguessr.Data.Views
{
    public class UsersLeaderboardTraining
    {
        public int rank { get; set; }
        public string id { get; set; }
        public int total_training_guessed { get; set; }
    }
}
