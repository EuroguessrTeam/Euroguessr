using System.ComponentModel.DataAnnotations;

namespace Euroguessr.Data.Migrations
{
    public class TestUser
    {

        [Key]
        public int ID { get; set; }

        [Key]
        [MaxLength(100)]
        public string Name { get; set; }

        [MaxLength(100)]
        public string? Surname { get; set; }
    }
}
