{
  inputs.nixpkgs.url = "github:nixos/nixpkgs/23.05";
  inputs.nixpkgs-unstable.url = "github:nixos/nixpkgs/nixos-unstable";

  outputs = { self, nixpkgs, nixpkgs-unstable }:
    let
      pkgs = nixpkgs.legacyPackages.x86_64-linux;
      unstable = nixpkgs-unstable.legacyPackages.x86_64-linux;
    in
    {
      devShell.x86_64-linux = pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = [
          pkgs.nodejs-18_x
        ];
      };
    };
}
