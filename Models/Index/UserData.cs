namespace Euroguessr.Models.Index
{
    [Serializable]
    public class UserData
    {
        public int NbTentatives { get; set; }
        public string DisplayMessage { get; set; }
        public bool IsWin { get; set; }
    }
}
