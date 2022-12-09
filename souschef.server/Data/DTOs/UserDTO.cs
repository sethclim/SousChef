namespace souschef.server.Data.DTOs
{
    public class UserDTO
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Id { get; set; }
        public int SkillLevel { get; set; }
        public string? CurrentSessionId { get; set; }
    }
}
